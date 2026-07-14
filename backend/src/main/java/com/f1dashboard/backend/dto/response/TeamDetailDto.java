package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TeamDetailDto {
    private String constructorId;
    private String name;
    private String nationality;
    private Integer position;
    private BigDecimal points;
    private Integer wins;
    private List<TeamDriverDto> drivers;
}
