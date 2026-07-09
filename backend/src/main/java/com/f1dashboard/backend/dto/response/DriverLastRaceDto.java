package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class DriverLastRaceDto {
    private String raceName;
    private Integer round;
    private Integer position;
    private BigDecimal points;
    private String fastestLapTime;
}
