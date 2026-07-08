package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.dto.response.DriverDto;
import com.f1dashboard.backend.entity.Constructor;
import com.f1dashboard.backend.entity.Driver;
import com.f1dashboard.backend.entity.DriverStanding;
import com.f1dashboard.backend.repository.DriverRepository;
import com.f1dashboard.backend.repository.DriverStandingRepository;
import com.f1dashboard.backend.service.DriverService;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;
    private final DriverStandingRepository driverStandingRepository;

    public DriverServiceImpl(DriverRepository driverRepository, DriverStandingRepository driverStandingRepository) {
        this.driverRepository = driverRepository;
        this.driverStandingRepository = driverStandingRepository;
    }

    @Override
    public List<DriverDto> getDrivers() {
        Map<String, Constructor> currentTeamByDriverId = currentTeamByDriverId();
        return driverRepository.findAll().stream()
                .sorted(Comparator.comparing(Driver::getFamilyName))
                .map(driver -> toDto(driver, currentTeamByDriverId.get(driver.getDriverId())))
                .toList();
    }

    private Map<String, Constructor> currentTeamByDriverId() {
        Integer season = driverStandingRepository.findFirstByOrderBySeasonDesc()
                .map(DriverStanding::getSeason)
                .orElse(null);
        if (season == null) {
            return Map.of();
        }
        Map<String, Constructor> result = new HashMap<>();
        for (DriverStanding standing : driverStandingRepository.findBySeasonOrderByPositionAsc(season)) {
            if (standing.getConstructor() != null) {
                result.put(standing.getDriver().getDriverId(), standing.getConstructor());
            }
        }
        return result;
    }

    private DriverDto toDto(Driver driver, Constructor constructor) {
        return new DriverDto(
                driver.getDriverId(),
                driver.getCode(),
                driver.getPermanentNumber(),
                driver.getGivenName(),
                driver.getFamilyName(),
                driver.getDateOfBirth(),
                driver.getNationality(),
                constructor != null ? constructor.getConstructorId() : null,
                constructor != null ? constructor.getName() : null
        );
    }
}
