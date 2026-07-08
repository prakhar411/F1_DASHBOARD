package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.ConstructorStanding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConstructorStandingRepository extends JpaRepository<ConstructorStanding, Long> {

    List<ConstructorStanding> findBySeasonOrderByPositionAsc(Integer season);

    Optional<ConstructorStanding> findBySeasonAndConstructor_ConstructorId(Integer season, String constructorId);

    Optional<ConstructorStanding> findFirstByOrderBySeasonDesc();
}
