package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.client.JolpicaClient;
import com.f1dashboard.backend.client.dto.JolpicaRaceDto;
import com.f1dashboard.backend.client.dto.JolpicaResultDto;
import com.f1dashboard.backend.dto.response.CircuitWinnerDto;
import com.f1dashboard.backend.entity.CircuitWinner;
import com.f1dashboard.backend.entity.Race;
import com.f1dashboard.backend.repository.CircuitWinnerRepository;
import com.f1dashboard.backend.repository.RaceRepository;
import com.f1dashboard.backend.service.CircuitService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.Year;
import java.util.Optional;

@Service
public class CircuitServiceImpl implements CircuitService {

    private static final Logger log = LoggerFactory.getLogger(CircuitServiceImpl.class);

    private final CircuitWinnerRepository circuitWinnerRepository;
    private final RaceRepository raceRepository;
    private final JolpicaClient jolpicaClient;

    public CircuitServiceImpl(CircuitWinnerRepository circuitWinnerRepository,
                               RaceRepository raceRepository,
                               JolpicaClient jolpicaClient) {
        this.circuitWinnerRepository = circuitWinnerRepository;
        this.raceRepository = raceRepository;
        this.jolpicaClient = jolpicaClient;
    }

    @Override
    public Optional<CircuitWinnerDto> getLastSeasonWinner(String circuitId) {
        CircuitWinner cached = circuitWinnerRepository.findById(circuitId)
                .orElseGet(() -> fetchAndCache(circuitId));
        // driverName null means "checked Jolpica, no race there last season" (e.g. brand-new circuits)
        if (cached == null || cached.getDriverName() == null) {
            return Optional.empty();
        }
        return Optional.of(new CircuitWinnerDto(
                cached.getSeason(),
                cached.getRaceName(),
                cached.getDriverId(),
                cached.getDriverName(),
                cached.getConstructorName(),
                cached.getFastestLapTime()
        ));
    }

    private CircuitWinner fetchAndCache(String circuitId) {
        int lastSeason = raceRepository.findFirstByOrderBySeasonDesc()
                .map(Race::getSeason)
                .orElse(Year.now().getValue()) - 1;
        try {
            CircuitWinner entity = new CircuitWinner();
            entity.setCircuitId(circuitId);
            entity.setSeason(lastSeason);
            entity.setFetchedAt(Instant.now());

            Optional<JolpicaRaceDto> race = jolpicaClient.fetchCircuitWinner(lastSeason, circuitId);
            if (race.isPresent() && race.get().getResults() != null && !race.get().getResults().isEmpty()) {
                JolpicaResultDto winner = race.get().getResults().get(0);
                entity.setRaceName(race.get().getRaceName());
                entity.setDriverId(winner.getDriver().getDriverId());
                entity.setDriverName(winner.getDriver().getGivenName() + " " + winner.getDriver().getFamilyName());
                if (winner.getConstructor() != null) {
                    entity.setConstructorName(winner.getConstructor().getName());
                }
                if (winner.getFastestLap() != null && winner.getFastestLap().getTime() != null) {
                    entity.setFastestLapTime(winner.getFastestLap().getTime().getTime());
                }
            }
            return circuitWinnerRepository.save(entity);
        } catch (Exception e) {
            log.warn("Failed to fetch {} winner for circuit {} — not caching", lastSeason, circuitId, e);
            return null;
        }
    }
}
