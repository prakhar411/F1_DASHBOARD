package com.f1dashboard.backend.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class StandingsListDto {
    private String season;

    @JsonProperty("DriverStandings")
    private List<JolpicaDriverStandingDto> driverStandings;

    @JsonProperty("ConstructorStandings")
    private List<JolpicaConstructorStandingDto> constructorStandings;
}
