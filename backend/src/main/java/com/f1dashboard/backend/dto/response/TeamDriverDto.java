package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class TeamDriverDto {
    private String driverId;
    private String code;
    private Integer permanentNumber;
    private String givenName;
    private String familyName;
    private Integer position;
    private BigDecimal points;
    private Integer wins;
}
