package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.SyncMarker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SyncMarkerRepository extends JpaRepository<SyncMarker, String> {
}
