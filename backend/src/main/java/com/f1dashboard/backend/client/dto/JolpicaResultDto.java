package com.f1dashboard.backend.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class JolpicaResultDto {
    private String position;
    private String points;

    @JsonProperty("Driver")
    private JolpicaDriverDto driver;

    @JsonProperty("Constructor")
    private JolpicaConstructorDto constructor;

    @JsonProperty("FastestLap")
    private JolpicaFastestLapDto fastestLap;
}
