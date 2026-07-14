package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.dto.response.ConstructorDto;
import com.f1dashboard.backend.dto.response.TeamDetailDto;
import com.f1dashboard.backend.dto.response.TeamDriverDto;
import com.f1dashboard.backend.entity.Constructor;
import com.f1dashboard.backend.entity.ConstructorStanding;
import com.f1dashboard.backend.entity.DriverStanding;
import com.f1dashboard.backend.repository.ConstructorRepository;
import com.f1dashboard.backend.repository.ConstructorStandingRepository;
import com.f1dashboard.backend.repository.DriverStandingRepository;
import com.f1dashboard.backend.service.ConstructorService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class ConstructorServiceImpl implements ConstructorService {

    private final ConstructorRepository constructorRepository;
    private final ConstructorStandingRepository constructorStandingRepository;
    private final DriverStandingRepository driverStandingRepository;

    public ConstructorServiceImpl(ConstructorRepository constructorRepository,
                                   ConstructorStandingRepository constructorStandingRepository,
                                   DriverStandingRepository driverStandingRepository) {
        this.constructorRepository = constructorRepository;
        this.constructorStandingRepository = constructorStandingRepository;
        this.driverStandingRepository = driverStandingRepository;
    }

    @Override
    public List<ConstructorDto> getConstructors() {
        return constructorRepository.findAll().stream()
                .sorted(Comparator.comparing(Constructor::getName))
                .map(this::toDto)
                .toList();
    }

    @Override
    public Optional<TeamDetailDto> getTeamDetail(String constructorId) {
        Optional<Constructor> constructorOpt = constructorRepository.findById(constructorId);
        if (constructorOpt.isEmpty()) {
            return Optional.empty();
        }
        Constructor constructor = constructorOpt.get();

        Optional<Integer> latestSeason = constructorStandingRepository.findFirstByOrderBySeasonDesc()
                .map(ConstructorStanding::getSeason);

        ConstructorStanding standing = latestSeason
                .flatMap(season -> constructorStandingRepository.findBySeasonAndConstructor_ConstructorId(season, constructorId))
                .orElse(null);

        List<TeamDriverDto> drivers = latestSeason
                .map(season -> driverStandingRepository.findBySeasonAndConstructorOrderByPositionAsc(season, constructorId))
                .orElse(List.of())
                .stream()
                .map(this::toDriverDto)
                .toList();

        return Optional.of(new TeamDetailDto(
                constructor.getConstructorId(),
                constructor.getName(),
                constructor.getNationality(),
                standing != null ? standing.getPosition() : null,
                standing != null ? standing.getPoints() : BigDecimal.ZERO,
                standing != null ? standing.getWins() : null,
                drivers
        ));
    }

    private TeamDriverDto toDriverDto(DriverStanding ds) {
        return new TeamDriverDto(
                ds.getDriver().getDriverId(),
                ds.getDriver().getCode(),
                ds.getDriver().getPermanentNumber(),
                ds.getDriver().getGivenName(),
                ds.getDriver().getFamilyName(),
                ds.getPosition(),
                ds.getPoints(),
                ds.getWins()
        );
    }

    private ConstructorDto toDto(Constructor constructor) {
        return new ConstructorDto(
                constructor.getConstructorId(),
                constructor.getName(),
                constructor.getNationality()
        );
    }
}
