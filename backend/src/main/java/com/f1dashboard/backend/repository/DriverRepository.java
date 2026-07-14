package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface DriverRepository extends JpaRepository<Driver, String> {

    @Transactional
    @Modifying
    @Query("UPDATE Driver d SET d.current = false")
    void markAllNotCurrent();
}
