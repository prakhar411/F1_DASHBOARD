package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.dto.response.ConstructorStandingDto;
import com.f1dashboard.backend.dto.response.DriverStandingDto;
import com.f1dashboard.backend.entity.Constructor;
import com.f1dashboard.backend.entity.ConstructorStanding;
import com.f1dashboard.backend.entity.DriverStanding;
import com.f1dashboard.backend.entity.RaceResult;
import com.f1dashboard.backend.repository.ConstructorStandingRepository;
import com.f1dashboard.backend.repository.DriverStandingRepository;
import com.f1dashboard.backend.repository.RaceResultRepository;
import com.f1dashboard.backend.service.StandingsService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StandingsServiceImpl implements StandingsService {

    private final DriverStandingRepository driverStandingRepository;
    private final ConstructorStandingRepository constructorStandingRepository;
    private final RaceResultRepository raceResultRepository;

    public StandingsServiceImpl(DriverStandingRepository driverStandingRepository,
                                 ConstructorStandingRepository constructorStandingRepository,
                                 RaceResultRepository raceResultRepository) {
        this.driverStandingRepository = driverStandingRepository;
        this.constructorStandingRepository = constructorStandingRepository;
        this.raceResultRepository = raceResultRepository;
    }

    @Override
    public List<DriverStandingDto> getDriverStandings() {
        Integer season = latestDriverStandingsSeason();
        if (season == null) {
            return Collections.emptyList();
        }
        Map<String, String> bestLapByDriver = seasonBestLapByDriver(season);
        return driverStandingRepository.findBySeasonOrderByPositionAsc(season).stream()
                .map(standing -> toDto(standing, bestLapByDriver.get(standing.getDriver().getDriverId())))
                .toList();
    }

    @Override
    public List<ConstructorStandingDto> getConstructorStandings() {
        Integer season = latestConstructorStandingsSeason();
        if (season == null) {
            return Collections.emptyList();
        }
        return constructorStandingRepository.findBySeasonOrderByPositionAsc(season).stream()
                .map(this::toDto)
                .toList();
    }

    private Map<String, String> seasonBestLapByDriver(Integer season) {
        return raceResultRepository.findByRace_SeasonAndFastestLapMillisIsNotNull(season).stream()
                .collect(Collectors.groupingBy(
                        rr -> rr.getDriver().getDriverId(),
                        Collectors.collectingAndThen(
                                Collectors.minBy((a, b) -> Integer.compare(a.getFastestLapMillis(), b.getFastestLapMillis())),
                                best -> best.map(RaceResult::getFastestLapTime).orElse(null)
                        )
                ));
    }

    private Integer latestDriverStandingsSeason() {
        return driverStandingRepository.findFirstByOrderBySeasonDesc()
                .map(DriverStanding::getSeason)
                .orElse(null);
    }

    private Integer latestConstructorStandingsSeason() {
        return constructorStandingRepository.findFirstByOrderBySeasonDesc()
                .map(ConstructorStanding::getSeason)
                .orElse(null);
    }

    private DriverStandingDto toDto(DriverStanding standing, String seasonBestLapTime) {
        Constructor constructor = standing.getConstructor();
        return new DriverStandingDto(
                standing.getPosition(),
                standing.getPoints(),
                standing.getWins(),
                standing.getDriver().getDriverId(),
                standing.getDriver().getCode(),
                standing.getDriver().getGivenName(),
                standing.getDriver().getFamilyName(),
                standing.getDriver().getNationality(),
                constructor != null ? constructor.getConstructorId() : null,
                constructor != null ? constructor.getName() : null,
                seasonBestLapTime
        );
    }

    private ConstructorStandingDto toDto(ConstructorStanding standing) {
        return new ConstructorStandingDto(
                standing.getPosition(),
                standing.getPoints(),
                standing.getWins(),
                standing.getConstructor().getConstructorId(),
                standing.getConstructor().getName(),
                standing.getConstructor().getNationality()
        );
    }
}
