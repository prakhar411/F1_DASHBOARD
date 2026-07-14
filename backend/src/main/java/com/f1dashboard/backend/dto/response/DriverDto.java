package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class DriverDto {
    private String driverId;
    private String code;
    private Integer permanentNumber;
    private String givenName;
    private String familyName;
    private LocalDate dateOfBirth;
    private String nationality;
    private String constructorId;
    private String constructorName;
    private boolean current;
}
