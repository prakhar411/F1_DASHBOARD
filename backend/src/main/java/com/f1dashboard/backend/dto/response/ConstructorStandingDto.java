package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class ConstructorStandingDto {
    private Integer position;
    private BigDecimal points;
    private Integer wins;
    private String constructorId;
    private String name;
    private String nationality;
}
