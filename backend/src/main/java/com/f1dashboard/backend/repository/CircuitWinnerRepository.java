package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.CircuitWinner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CircuitWinnerRepository extends JpaRepository<CircuitWinner, String> {
}
