package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.RaceResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RaceResultRepository extends JpaRepository<RaceResult, Long> {

    boolean existsByRace_Id(Long raceId);

    Optional<RaceResult> findByRace_IdAndDriver_DriverId(Long raceId, String driverId);

    @Query("SELECT rr FROM RaceResult rr "
            + "JOIN FETCH rr.driver "
            + "LEFT JOIN FETCH rr.constructor "
            + "JOIN FETCH rr.race "
            + "WHERE rr.race.season = :season AND rr.fastestLapMillis IS NOT NULL")
    List<RaceResult> findByRace_SeasonAndFastestLapMillisIsNotNull(@Param("season") Integer season);

    @Query("SELECT rr FROM RaceResult rr "
            + "JOIN FETCH rr.race "
            + "LEFT JOIN FETCH rr.constructor "
            + "WHERE rr.driver.driverId = :driverId ORDER BY rr.race.raceDate DESC")
    List<RaceResult> findByDriverOrderByRaceDateDesc(@Param("driverId") String driverId);
}
