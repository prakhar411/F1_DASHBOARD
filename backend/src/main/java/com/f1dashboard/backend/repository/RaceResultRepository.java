package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.RaceResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RaceResultRepository extends JpaRepository<RaceResult, Long> {

    boolean existsByRace_Id(Long raceId);

    Optional<RaceResult> findByRace_IdAndDriver_DriverId(Long raceId, String driverId);

    List<RaceResult> findByRace_SeasonAndFastestLapMillisIsNotNull(Integer season);

    Optional<RaceResult> findFirstByDriver_DriverIdOrderByRace_RaceDateDesc(String driverId);
}
