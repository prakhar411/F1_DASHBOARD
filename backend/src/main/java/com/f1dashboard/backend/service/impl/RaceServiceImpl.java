package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.dto.response.CircuitWinnerDto;
import com.f1dashboard.backend.dto.response.RaceDto;
import com.f1dashboard.backend.entity.Race;
import com.f1dashboard.backend.entity.RaceResult;
import com.f1dashboard.backend.repository.RaceRepository;
import com.f1dashboard.backend.repository.RaceResultRepository;
import com.f1dashboard.backend.service.CircuitService;
import com.f1dashboard.backend.service.RaceService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class RaceServiceImpl implements RaceService {

    private final RaceRepository raceRepository;
    private final RaceResultRepository raceResultRepository;
    private final CircuitService circuitService;

    public RaceServiceImpl(RaceRepository raceRepository,
                           RaceResultRepository raceResultRepository,
                           CircuitService circuitService) {
        this.raceRepository = raceRepository;
        this.raceResultRepository = raceResultRepository;
        this.circuitService = circuitService;
    }

    @Override
    public List<RaceDto> getCalendar() {
        Integer season = latestSeason();
        if (season == null) {
            return Collections.emptyList();
        }

        Map<Integer, RaceResult> winnersByRound = raceResultRepository.findWinnersBySeason(season).stream()
                .collect(Collectors.toMap(rr -> rr.getRace().getRound(), Function.identity(), (a, b) -> a));

        LocalDate today = LocalDate.now();
        return raceRepository.findBySeasonOrderByRoundAsc(season).stream()
                .map(race -> {
                    RaceDto dto = toDto(race);
                    if (race.getRaceDate() != null && !race.getRaceDate().isAfter(today)) {
                        enrichWithWinners(dto, race, winnersByRound.get(race.getRound()));
                    }
                    return dto;
                })
                .toList();
    }

    @Override
    public Optional<RaceDto> getNextRace() {
        Integer season = latestSeason();
        if (season == null) {
            return Optional.empty();
        }
        return raceRepository
                .findFirstBySeasonAndRaceDateGreaterThanEqualOrderByRaceDateAsc(season, LocalDate.now())
                .map(this::toDto);
    }

    private void enrichWithWinners(RaceDto dto, Race race, RaceResult winner) {
        if (winner != null && winner.getDriver() != null) {
            dto.setWinnerDriverId(winner.getDriver().getDriverId());
            dto.setWinnerName(winner.getDriver().getGivenName() + " " + winner.getDriver().getFamilyName());
        }
        if (race.getCircuitId() != null) {
            circuitService.getLastSeasonWinner(race.getCircuitId()).ifPresent(lastYear -> {
                dto.setLastYearWinnerName(lastYear.getDriverName());
                dto.setLastYearSeason(lastYear.getSeason());
            });
        }
    }

    private Integer latestSeason() {
        return raceRepository.findFirstByOrderBySeasonDesc()
                .map(Race::getSeason)
                .orElse(null);
    }

    private RaceDto toDto(Race race) {
        LocalTime time = race.getRaceTime() != null ? race.getRaceTime() : LocalTime.MIDNIGHT;
        OffsetDateTime dateTimeUtc = OffsetDateTime.of(race.getRaceDate(), time, ZoneOffset.UTC);
        return new RaceDto(
                race.getSeason(),
                race.getRound(),
                race.getRaceName(),
                race.getCircuitId(),
                race.getCircuitName(),
                race.getLocality(),
                race.getCountry(),
                race.getRaceDate(),
                race.getRaceTime(),
                dateTimeUtc,
                null,
                null,
                null,
                null
        );
    }
}
