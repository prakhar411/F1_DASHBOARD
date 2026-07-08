package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.dto.response.RaceDto;
import com.f1dashboard.backend.entity.Race;
import com.f1dashboard.backend.repository.RaceRepository;
import com.f1dashboard.backend.service.RaceService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class RaceServiceImpl implements RaceService {

    private final RaceRepository raceRepository;

    public RaceServiceImpl(RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    @Override
    public List<RaceDto> getCalendar() {
        Integer season = latestSeason();
        if (season == null) {
            return Collections.emptyList();
        }
        return raceRepository.findBySeasonOrderByRoundAsc(season).stream()
                .map(this::toDto)
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
                race.getCircuitName(),
                race.getLocality(),
                race.getCountry(),
                race.getRaceDate(),
                race.getRaceTime(),
                dateTimeUtc
        );
    }
}
