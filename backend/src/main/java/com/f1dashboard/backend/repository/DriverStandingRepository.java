package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.DriverStanding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DriverStandingRepository extends JpaRepository<DriverStanding, Long> {

    @Query("SELECT ds FROM DriverStanding ds "
            + "JOIN FETCH ds.driver "
            + "LEFT JOIN FETCH ds.constructor "
            + "WHERE ds.season = :season ORDER BY ds.position ASC")
    List<DriverStanding> findBySeasonOrderByPositionAsc(@Param("season") Integer season);

    Optional<DriverStanding> findBySeasonAndDriver_DriverId(Integer season, String driverId);

    Optional<DriverStanding> findFirstByOrderBySeasonDesc();
}
