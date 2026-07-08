package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PodiumFinisherDto {
    private Integer position;
    private String driverId;
    private String givenName;
    private String familyName;
    private String code;
    private String constructorId;
    private String constructorName;
    private String bestLapTime;
}
