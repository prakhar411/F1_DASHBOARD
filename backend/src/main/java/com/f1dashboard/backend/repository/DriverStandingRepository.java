package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.DriverStanding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DriverStandingRepository extends JpaRepository<DriverStanding, Long> {

    List<DriverStanding> findBySeasonOrderByPositionAsc(Integer season);

    Optional<DriverStanding> findBySeasonAndDriver_DriverId(Integer season, String driverId);

    Optional<DriverStanding> findFirstByOrderBySeasonDesc();
}
