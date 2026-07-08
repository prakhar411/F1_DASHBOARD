package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, String> {
}
