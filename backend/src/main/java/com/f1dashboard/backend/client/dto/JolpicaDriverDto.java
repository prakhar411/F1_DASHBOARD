package com.f1dashboard.backend.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class JolpicaDriverDto {
    private String driverId;
    private String code;
    private String permanentNumber;
    private String givenName;
    private String familyName;
    private String dateOfBirth;
    private String nationality;
    private String url;
}
