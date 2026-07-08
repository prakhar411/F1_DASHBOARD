package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.Race;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RaceRepository extends JpaRepository<Race, Long> {

    List<Race> findBySeasonOrderByRoundAsc(Integer season);

    Optional<Race> findFirstBySeasonAndRaceDateGreaterThanEqualOrderByRaceDateAsc(Integer season, LocalDate date);

    Optional<Race> findBySeasonAndRound(Integer season, Integer round);

    Optional<Race> findFirstByOrderBySeasonDesc();
}
