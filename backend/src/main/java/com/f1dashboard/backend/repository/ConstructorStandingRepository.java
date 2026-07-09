package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.ConstructorStanding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConstructorStandingRepository extends JpaRepository<ConstructorStanding, Long> {

    @Query("SELECT cs FROM ConstructorStanding cs "
            + "JOIN FETCH cs.constructor "
            + "WHERE cs.season = :season ORDER BY cs.position ASC")
    List<ConstructorStanding> findBySeasonOrderByPositionAsc(@Param("season") Integer season);

    Optional<ConstructorStanding> findBySeasonAndConstructor_ConstructorId(Integer season, String constructorId);

    Optional<ConstructorStanding> findFirstByOrderBySeasonDesc();
}
