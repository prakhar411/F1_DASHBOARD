package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.client.JolpicaClient;
import com.f1dashboard.backend.client.dto.JolpicaDriverStandingDto;
import com.f1dashboard.backend.dto.response.DriverDetailDto;
import com.f1dashboard.backend.dto.response.DriverLastRaceDto;
import com.f1dashboard.backend.dto.response.TeamStintDto;
import com.f1dashboard.backend.entity.Constructor;
import com.f1dashboard.backend.entity.Driver;
import com.f1dashboard.backend.entity.DriverCareerStats;
import com.f1dashboard.backend.entity.DriverStanding;
import com.f1dashboard.backend.entity.RaceResult;
import com.f1dashboard.backend.repository.DriverCareerStatsRepository;
import com.f1dashboard.backend.repository.DriverRepository;
import com.f1dashboard.backend.repository.DriverStandingRepository;
import com.f1dashboard.backend.repository.RaceResultRepository;
import com.f1dashboard.backend.service.DriverDetailService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class DriverDetailServiceImpl implements DriverDetailService {

    private static final Logger log = LoggerFactory.getLogger(DriverDetailServiceImpl.class);

    private final DriverRepository driverRepository;
    private final DriverStandingRepository driverStandingRepository;
    private final RaceResultRepository raceResultRepository;
    private final DriverCareerStatsRepository careerStatsRepository;
    private final JolpicaClient jolpicaClient;
    private final ObjectMapper objectMapper;

    public DriverDetailServiceImpl(DriverRepository driverRepository,
                                    DriverStandingRepository driverStandingRepository,
                                    RaceResultRepository raceResultRepository,
                                    DriverCareerStatsRepository careerStatsRepository,
                                    JolpicaClient jolpicaClient,
                                    ObjectMapper objectMapper) {
        this.driverRepository = driverRepository;
        this.driverStandingRepository = driverStandingRepository;
        this.raceResultRepository = raceResultRepository;
        this.careerStatsRepository = careerStatsRepository;
        this.jolpicaClient = jolpicaClient;
        this.objectMapper = objectMapper;
    }

    @Override
    public Optional<DriverDetailDto> getDriverDetail(String driverId) {
        Optional<Driver> driverOpt = driverRepository.findById(driverId);
        if (driverOpt.isEmpty()) {
            return Optional.empty();
        }
        Driver driver = driverOpt.get();

        DriverStanding standing = latestStanding(driverId).orElse(null);
        Constructor constructor = standing != null ? standing.getConstructor() : null;

        DriverCareerStats stats = careerStatsRepository.findById(driverId)
                .orElseGet(() -> fetchAndCacheCareerStats(driverId, constructor));

        RaceResult lastResult = raceResultRepository
                .findFirstByDriver_DriverIdOrderByRace_RaceDateDesc(driverId)
                .orElse(null);

        return Optional.of(new DriverDetailDto(
                driver.getDriverId(),
                driver.getCode(),
                driver.getPermanentNumber(),
                driver.getGivenName(),
                driver.getFamilyName(),
                driver.getNationality(),
                driver.getDateOfBirth(),
                constructor != null ? constructor.getConstructorId() : null,
                constructor != null ? constructor.getName() : null,
                standing != null ? standing.getPosition() : null,
                standing != null ? standing.getPoints() : null,
                standing != null ? standing.getWins() : null,
                seasonBestLap(driverId, standing),
                stats != null ? stats.getCareerWins() : null,
                stats != null ? stats.getCareerPodiums() : null,
                stats != null ? stats.getChampionships() : null,
                stats != null ? stats.getCareerPoints() : null,
                stats != null ? stats.getSeasonsCount() : null,
                stats != null ? stats.getFirstSeason() : null,
                stats != null ? stats.getCurrentTeamSince() : null,
                stats != null ? parseStints(stats.getPreviousTeamsJson()) : Collections.emptyList(),
                lastResult != null ? toLastRaceDto(lastResult) : null
        ));
    }

    private Optional<DriverStanding> latestStanding(String driverId) {
        return driverStandingRepository.findFirstByOrderBySeasonDesc()
                .flatMap(any -> driverStandingRepository.findBySeasonAndDriver_DriverId(any.getSeason(), driverId));
    }

    private String seasonBestLap(String driverId, DriverStanding standing) {
        if (standing == null) {
            return null;
        }
        return raceResultRepository.findByRace_SeasonAndFastestLapMillisIsNotNull(standing.getSeason()).stream()
                .filter(rr -> rr.getDriver().getDriverId().equals(driverId))
                .min((a, b) -> Integer.compare(a.getFastestLapMillis(), b.getFastestLapMillis()))
                .map(RaceResult::getFastestLapTime)
                .orElse(null);
    }

    private DriverLastRaceDto toLastRaceDto(RaceResult result) {
        return new DriverLastRaceDto(
                result.getRace().getRaceName(),
                result.getRace().getRound(),
                result.getPosition(),
                result.getPoints(),
                result.getFastestLapTime()
        );
    }

    /**
     * Career stats come from Jolpica on first request, then live permanently in
     * driver_career_stats. Wins/podiums use the MRData total-count trick (1 call
     * each); championships, career points and team history come from one
     * standings call per season the driver raced.
     */
    private DriverCareerStats fetchAndCacheCareerStats(String driverId, Constructor currentConstructor) {
        try {
            int wins = jolpicaClient.countDriverFinishesAtPosition(driverId, 1);
            pause();
            int p2 = jolpicaClient.countDriverFinishesAtPosition(driverId, 2);
            pause();
            int p3 = jolpicaClient.countDriverFinishesAtPosition(driverId, 3);
            pause();

            List<String> seasons = jolpicaClient.fetchDriverSeasons(driverId);

            int championships = 0;
            BigDecimal careerPoints = BigDecimal.ZERO;
            List<TeamStintDto> stints = new ArrayList<>();

            for (String season : seasons) {
                pause();
                Optional<JolpicaDriverStandingDto> seasonStanding =
                        jolpicaClient.fetchDriverStandingForSeason(season, driverId);
                if (seasonStanding.isEmpty()) {
                    continue;
                }
                JolpicaDriverStandingDto s = seasonStanding.get();
                if ("1".equals(s.getPosition())) {
                    championships++;
                }
                if (s.getPoints() != null && !s.getPoints().isBlank()) {
                    careerPoints = careerPoints.add(new BigDecimal(s.getPoints()));
                }
                if (s.getConstructors() != null && !s.getConstructors().isEmpty()) {
                    var c = s.getConstructors().get(s.getConstructors().size() - 1);
                    int year = Integer.parseInt(season);
                    if (!stints.isEmpty() && stints.get(stints.size() - 1).getConstructorId().equals(c.getConstructorId())) {
                        stints.get(stints.size() - 1).setToSeason(year);
                    } else {
                        stints.add(new TeamStintDto(c.getConstructorId(), c.getName(), year, year));
                    }
                }
            }

            Integer currentTeamSince = null;
            List<TeamStintDto> previousTeams = stints;
            if (!stints.isEmpty() && currentConstructor != null
                    && stints.get(stints.size() - 1).getConstructorId().equals(currentConstructor.getConstructorId())) {
                currentTeamSince = stints.get(stints.size() - 1).getFromSeason();
                previousTeams = stints.subList(0, stints.size() - 1);
            }

            DriverCareerStats stats = new DriverCareerStats();
            stats.setDriverId(driverId);
            stats.setCareerWins(wins);
            stats.setCareerPodiums(wins + p2 + p3);
            stats.setChampionships(championships);
            stats.setCareerPoints(careerPoints);
            stats.setSeasonsCount(seasons.size());
            stats.setFirstSeason(seasons.isEmpty() ? null : Integer.parseInt(seasons.get(0)));
            stats.setCurrentTeamSince(currentTeamSince);
            stats.setPreviousTeamsJson(objectMapper.writeValueAsString(previousTeams));
            stats.setFetchedAt(Instant.now());
            return careerStatsRepository.save(stats);
        } catch (Exception e) {
            log.warn("Failed to fetch career stats for {} — returning detail without them", driverId, e);
            return null;
        }
    }

    private List<TeamStintDto> parseStints(String json) {
        if (json == null || json.isBlank()) {
            return Collections.emptyList();
        }
        try {
            return objectMapper.readValue(json, new TypeReference<List<TeamStintDto>>() { });
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    private void pause() {
        try {
            Thread.sleep(350);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
