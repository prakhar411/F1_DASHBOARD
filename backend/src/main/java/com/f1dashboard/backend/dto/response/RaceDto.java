package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;

@Getter
@Setter
@AllArgsConstructor
public class RaceDto {
    private Integer season;
    private Integer round;
    private String raceName;
    private String circuitId;
    private String circuitName;
    private String locality;
    private String country;
    private LocalDate raceDate;
    private LocalTime raceTime;
    private OffsetDateTime raceDateTimeUtc;
}
