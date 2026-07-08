package com.f1dashboard.backend.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class JolpicaFastestLapDto {
    private String rank;
    private String lap;

    @JsonProperty("Time")
    private JolpicaLapTimeDto time;
}
