package com.f1dashboard.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "driver_career_stats")
@Getter
@Setter
@NoArgsConstructor
public class DriverCareerStats {

    @Id
    private String driverId;

    private Integer careerWins;
    private Integer careerPodiums;
    private Integer championships;
    private BigDecimal careerPoints;
    private Integer seasonsCount;
    private Integer firstSeason;
    private Integer currentTeamSince;

    @Column(columnDefinition = "TEXT")
    private String previousTeamsJson;

    private Instant fetchedAt;
}
