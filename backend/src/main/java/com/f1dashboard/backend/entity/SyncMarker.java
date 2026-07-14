package com.f1dashboard.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "sync_markers")
@Getter
@Setter
@NoArgsConstructor
public class SyncMarker {

    @Id
    private String markerKey;

    private Instant completedAt;
}
