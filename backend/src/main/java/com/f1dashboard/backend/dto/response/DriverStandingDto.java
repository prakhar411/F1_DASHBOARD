package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class DriverStandingDto {
    private Integer position;
    private BigDecimal points;
    private Integer wins;
    private String driverId;
    private String code;
    private String givenName;
    private String familyName;
    private String nationality;
    private String constructorId;
    private String constructorName;
    private String seasonBestLapTime;
}
