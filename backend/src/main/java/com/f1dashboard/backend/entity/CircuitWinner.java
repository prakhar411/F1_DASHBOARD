package com.f1dashboard.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "circuit_winners")
@Getter
@Setter
@NoArgsConstructor
public class CircuitWinner {

    @Id
    private String circuitId;

    private Integer season;
    private String raceName;
    private String driverId;
    private String driverName;
    private String constructorName;
    private String fastestLapTime;
    private Instant fetchedAt;
}
