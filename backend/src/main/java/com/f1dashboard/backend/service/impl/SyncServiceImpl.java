package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.client.JolpicaClient;
import com.f1dashboard.backend.client.dto.JolpicaConstructorDto;
import com.f1dashboard.backend.client.dto.JolpicaConstructorStandingDto;
import com.f1dashboard.backend.client.dto.JolpicaDriverDto;
import com.f1dashboard.backend.client.dto.JolpicaDriverStandingDto;
import com.f1dashboard.backend.client.dto.JolpicaRaceDto;
import com.f1dashboard.backend.client.dto.JolpicaResultDto;
import com.f1dashboard.backend.entity.Constructor;
import com.f1dashboard.backend.entity.ConstructorStanding;
import com.f1dashboard.backend.entity.Driver;
import com.f1dashboard.backend.entity.DriverStanding;
import com.f1dashboard.backend.entity.Race;
import com.f1dashboard.backend.entity.RaceResult;
import com.f1dashboard.backend.entity.SyncMarker;
import com.f1dashboard.backend.repository.ConstructorRepository;
import com.f1dashboard.backend.repository.ConstructorStandingRepository;
import com.f1dashboard.backend.repository.DriverRepository;
import com.f1dashboard.backend.repository.DriverStandingRepository;
import com.f1dashboard.backend.repository.RaceRepository;
import com.f1dashboard.backend.repository.RaceResultRepository;
import com.f1dashboard.backend.repository.SyncMarkerRepository;
import com.f1dashboard.backend.service.RaceResultService;
import com.f1dashboard.backend.service.SyncService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class SyncServiceImpl implements SyncService {

    private static final Logger log = LoggerFactory.getLogger(SyncServiceImpl.class);

    private final JolpicaClient jolpicaClient;
    private final ConstructorRepository constructorRepository;
    private final DriverRepository driverRepository;
    private final RaceRepository raceRepository;
    private final ConstructorStandingRepository constructorStandingRepository;
    private final DriverStandingRepository driverStandingRepository;
    private final RaceResultRepository raceResultRepository;
    private final SyncMarkerRepository syncMarkerRepository;
    private final RaceResultService raceResultService;

    public SyncServiceImpl(JolpicaClient jolpicaClient,
                            ConstructorRepository constructorRepository,
                            DriverRepository driverRepository,
                            RaceRepository raceRepository,
                            ConstructorStandingRepository constructorStandingRepository,
                            DriverStandingRepository driverStandingRepository,
                            RaceResultRepository raceResultRepository,
                            SyncMarkerRepository syncMarkerRepository,
                            RaceResultService raceResultService) {
        this.jolpicaClient = jolpicaClient;
        this.constructorRepository = constructorRepository;
        this.driverRepository = driverRepository;
        this.raceRepository = raceRepository;
        this.constructorStandingRepository = constructorStandingRepository;
        this.driverStandingRepository = driverStandingRepository;
        this.raceResultRepository = raceResultRepository;
        this.syncMarkerRepository = syncMarkerRepository;
        this.raceResultService = raceResultService;
    }

    @Override
    @Scheduled(fixedRate = 6, initialDelay = 6, timeUnit = TimeUnit.HOURS)
    public void syncAll() {
        syncConstructors();
        syncDrivers();
        syncHistoricalDrivers();
        Integer season = syncRaces();
        syncConstructorStandings(season);
        syncDriverStandings(season);
        syncRaceResults(season);
        raceResultService.refreshCache();
        log.info("F1 data sync complete for season {}", season);
    }

    private void syncConstructors() {
        List<JolpicaConstructorDto> constructors = jolpicaClient.fetchCurrentConstructors();
        for (JolpicaConstructorDto dto : constructors) {
            Constructor entity = constructorRepository.findById(dto.getConstructorId()).orElseGet(Constructor::new);
            entity.setConstructorId(dto.getConstructorId());
            entity.setName(dto.getName());
            entity.setNationality(dto.getNationality());
            entity.setUrl(dto.getUrl());
            constructorRepository.save(entity);
        }
    }

    private void syncDrivers() {
        List<JolpicaDriverDto> drivers = jolpicaClient.fetchCurrentDrivers();
        driverRepository.markAllNotCurrent();
        for (JolpicaDriverDto dto : drivers) {
            Driver entity = driverRepository.findById(dto.getDriverId()).orElseGet(Driver::new);
            entity.setDriverId(dto.getDriverId());
            entity.setCode(dto.getCode());
            entity.setPermanentNumber(parseInt(dto.getPermanentNumber()));
            entity.setGivenName(dto.getGivenName());
            entity.setFamilyName(dto.getFamilyName());
            entity.setDateOfBirth(parseDate(dto.getDateOfBirth()));
            entity.setNationality(dto.getNationality());
            entity.setUrl(dto.getUrl());
            entity.setCurrent(true);
            driverRepository.save(entity);
        }
    }

    private static final String HISTORICAL_DRIVERS_MARKER = "historical_drivers_2000_2025";
    private static final int HISTORICAL_FROM_SEASON = 2000;
    private static final int HISTORICAL_TO_SEASON = 2025;

    /**
     * One-time backfill of every driver who raced between 2000 and 2025, so the
     * Drivers page can show a "Former Drivers" section. Historical seasons never
     * change, so this is gated by a sync marker and skipped on every later sync.
     */
    private void syncHistoricalDrivers() {
        if (syncMarkerRepository.existsById(HISTORICAL_DRIVERS_MARKER)) {
            return;
        }
        log.info("Backfilling historical drivers {}-{}", HISTORICAL_FROM_SEASON, HISTORICAL_TO_SEASON);
        for (int season = HISTORICAL_FROM_SEASON; season <= HISTORICAL_TO_SEASON; season++) {
            try {
                for (JolpicaDriverDto dto : jolpicaClient.fetchDriversForSeason(season)) {
                    if (driverRepository.existsById(dto.getDriverId())) {
                        continue;
                    }
                    Driver entity = new Driver();
                    entity.setDriverId(dto.getDriverId());
                    entity.setCode(dto.getCode());
                    entity.setPermanentNumber(parseInt(dto.getPermanentNumber()));
                    entity.setGivenName(dto.getGivenName());
                    entity.setFamilyName(dto.getFamilyName());
                    entity.setDateOfBirth(parseDate(dto.getDateOfBirth()));
                    entity.setNationality(dto.getNationality());
                    entity.setUrl(dto.getUrl());
                    entity.setCurrent(false);
                    driverRepository.save(entity);
                }
                Thread.sleep(350);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return;
            } catch (Exception e) {
                log.warn("Failed to backfill drivers for season {} — will retry on next sync", season, e);
                return;
            }
        }
        SyncMarker marker = new SyncMarker();
        marker.setMarkerKey(HISTORICAL_DRIVERS_MARKER);
        marker.setCompletedAt(Instant.now());
        syncMarkerRepository.save(marker);
        log.info("Historical driver backfill complete");
    }

    private Integer syncRaces() {
        List<JolpicaRaceDto> races = jolpicaClient.fetchCurrentRaces();
        Integer season = races.isEmpty() ? LocalDate.now().getYear() : parseInt(races.get(0).getSeason());
        for (JolpicaRaceDto dto : races) {
            Integer round = parseInt(dto.getRound());
            Race entity = raceRepository.findBySeasonAndRound(season, round).orElseGet(Race::new);
            entity.setSeason(season);
            entity.setRound(round);
            entity.setRaceName(dto.getRaceName());
            if (dto.getCircuit() != null) {
                entity.setCircuitId(dto.getCircuit().getCircuitId());
                entity.setCircuitName(dto.getCircuit().getCircuitName());
                if (dto.getCircuit().getLocation() != null) {
                    entity.setLocality(dto.getCircuit().getLocation().getLocality());
                    entity.setCountry(dto.getCircuit().getLocation().getCountry());
                }
            }
            entity.setRaceDate(parseDate(dto.getDate()));
            entity.setRaceTime(parseTime(dto.getTime()));
            raceRepository.save(entity);
        }
        return season;
    }

    private void syncConstructorStandings(Integer season) {
        List<JolpicaConstructorStandingDto> standings = jolpicaClient.fetchCurrentConstructorStandings();
        for (JolpicaConstructorStandingDto dto : standings) {
            String constructorId = dto.getConstructor().getConstructorId();
            ConstructorStanding entity = constructorStandingRepository
                    .findBySeasonAndConstructor_ConstructorId(season, constructorId)
                    .orElseGet(ConstructorStanding::new);
            entity.setSeason(season);
            entity.setConstructor(constructorRepository.findById(constructorId).orElseThrow());
            entity.setPosition(parseInt(dto.getPosition()));
            entity.setPoints(parseDecimal(dto.getPoints()));
            entity.setWins(parseInt(dto.getWins()));
            constructorStandingRepository.save(entity);
        }
    }

    private void syncDriverStandings(Integer season) {
        List<JolpicaDriverStandingDto> standings = jolpicaClient.fetchCurrentDriverStandings();
        for (JolpicaDriverStandingDto dto : standings) {
            String driverId = dto.getDriver().getDriverId();
            DriverStanding entity = driverStandingRepository
                    .findBySeasonAndDriver_DriverId(season, driverId)
                    .orElseGet(DriverStanding::new);
            entity.setSeason(season);
            entity.setDriver(driverRepository.findById(driverId).orElseThrow());
            if (dto.getConstructors() != null && !dto.getConstructors().isEmpty()) {
                String constructorId = dto.getConstructors().get(dto.getConstructors().size() - 1).getConstructorId();
                entity.setConstructor(constructorRepository.findById(constructorId).orElse(null));
            }
            entity.setPosition(parseInt(dto.getPosition()));
            entity.setPoints(parseDecimal(dto.getPoints()));
            entity.setWins(parseInt(dto.getWins()));
            driverStandingRepository.save(entity);
        }
    }

    private void syncRaceResults(Integer season) {
        List<Race> completedRaces = raceRepository.findBySeasonOrderByRoundAsc(season).stream()
                .filter(race -> race.getRaceDate() != null && !race.getRaceDate().isAfter(LocalDate.now()))
                .filter(race -> !raceResultRepository.existsByRace_Id(race.getId()))
                .toList();

        for (Race race : completedRaces) {
            try {
                jolpicaClient.fetchRaceResults(season, race.getRound()).ifPresent(raceDto -> {
                    List<JolpicaResultDto> results = raceDto.getResults();
                    if (results == null) {
                        return;
                    }
                    for (JolpicaResultDto dto : results) {
                        RaceResult entity = raceResultRepository
                                .findByRace_IdAndDriver_DriverId(race.getId(), dto.getDriver().getDriverId())
                                .orElseGet(RaceResult::new);
                        entity.setRace(race);
                        entity.setDriver(driverRepository.findById(dto.getDriver().getDriverId()).orElseThrow());
                        if (dto.getConstructor() != null) {
                            entity.setConstructor(constructorRepository.findById(dto.getConstructor().getConstructorId()).orElse(null));
                        }
                        entity.setPosition(parseInt(dto.getPosition()));
                        entity.setPoints(parseDecimal(dto.getPoints()));
                        if (dto.getFastestLap() != null && dto.getFastestLap().getTime() != null) {
                            String lapTime = dto.getFastestLap().getTime().getTime();
                            entity.setFastestLapTime(lapTime);
                            entity.setFastestLapMillis(parseLapMillis(lapTime));
                            entity.setFastestLapRank(parseInt(dto.getFastestLap().getRank()));
                        }
                        raceResultRepository.save(entity);
                    }
                });
                Thread.sleep(400);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } catch (Exception e) {
                log.warn("Failed to sync results for {} round {}", season, race.getRound(), e);
            }
        }
    }

    private Integer parseLapMillis(String time) {
        if (time == null || time.isBlank()) {
            return null;
        }
        try {
            String[] parts = time.split(":");
            int minutes = 0;
            String secondsPart = parts[0];
            if (parts.length == 2) {
                minutes = Integer.parseInt(parts[0]);
                secondsPart = parts[1];
            }
            double seconds = Double.parseDouble(secondsPart);
            return (int) Math.round((minutes * 60 + seconds) * 1000);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Integer parseInt(String value) {
        return (value == null || value.isBlank()) ? null : Integer.parseInt(value);
    }

    private BigDecimal parseDecimal(String value) {
        return (value == null || value.isBlank()) ? null : new BigDecimal(value);
    }

    private LocalDate parseDate(String value) {
        return (value == null || value.isBlank()) ? null : LocalDate.parse(value);
    }

    private LocalTime parseTime(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return LocalTime.parse(value.replace("Z", ""));
    }
}
