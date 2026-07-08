package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.client.JolpicaClient;
import com.f1dashboard.backend.client.dto.JolpicaRaceDto;
import com.f1dashboard.backend.client.dto.JolpicaResultDto;
import com.f1dashboard.backend.dto.response.LastRaceRecapDto;
import com.f1dashboard.backend.dto.response.PodiumFinisherDto;
import com.f1dashboard.backend.service.RaceResultService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RaceResultServiceImpl implements RaceResultService {

    private static final Logger log = LoggerFactory.getLogger(RaceResultServiceImpl.class);

    private final JolpicaClient jolpicaClient;

    private volatile LastRaceRecapDto cachedRecap;

    public RaceResultServiceImpl(JolpicaClient jolpicaClient) {
        this.jolpicaClient = jolpicaClient;
    }

    @Override
    public Optional<LastRaceRecapDto> getLastRaceRecap() {
        return Optional.ofNullable(cachedRecap);
    }

    @Override
    public void refreshCache() {
        try {
            Optional<JolpicaRaceDto> race = jolpicaClient.fetchLastRaceResult();
            cachedRecap = race.map(this::toDto).orElse(null);
        } catch (Exception e) {
            log.warn("Failed to refresh last race result cache", e);
        }
    }

    private LastRaceRecapDto toDto(JolpicaRaceDto race) {
        List<PodiumFinisherDto> podium = race.getResults() == null ? List.of() : race.getResults().stream()
                .filter(r -> parseInt(r.getPosition()) != null && parseInt(r.getPosition()) <= 3)
                .map(this::toPodiumFinisher)
                .toList();

        return new LastRaceRecapDto(
                parseInt(race.getSeason()),
                parseInt(race.getRound()),
                race.getRaceName(),
                podium
        );
    }

    private PodiumFinisherDto toPodiumFinisher(JolpicaResultDto result) {
        String bestLapTime = (result.getFastestLap() != null && result.getFastestLap().getTime() != null)
                ? result.getFastestLap().getTime().getTime()
                : null;
        return new PodiumFinisherDto(
                parseInt(result.getPosition()),
                result.getDriver().getDriverId(),
                result.getDriver().getGivenName(),
                result.getDriver().getFamilyName(),
                result.getDriver().getCode(),
                result.getConstructor().getConstructorId(),
                result.getConstructor().getName(),
                bestLapTime
        );
    }

    private Integer parseInt(String value) {
        return (value == null || value.isBlank()) ? null : Integer.parseInt(value);
    }
}
