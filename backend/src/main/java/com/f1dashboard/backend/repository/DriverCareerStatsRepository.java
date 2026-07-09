package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.DriverCareerStats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverCareerStatsRepository extends JpaRepository<DriverCareerStats, String> {
}
