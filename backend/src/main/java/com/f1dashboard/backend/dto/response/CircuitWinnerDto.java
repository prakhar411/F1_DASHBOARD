package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CircuitWinnerDto {
    private Integer season;
    private String raceName;
    private String driverId;
    private String driverName;
    private String constructorName;
    private String fastestLapTime;
}
