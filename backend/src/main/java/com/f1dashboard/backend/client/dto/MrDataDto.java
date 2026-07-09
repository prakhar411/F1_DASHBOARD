package com.f1dashboard.backend.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class MrDataDto {
    private String total;

    @JsonProperty("StandingsTable")
    private StandingsTableDto standingsTable;

    @JsonProperty("RaceTable")
    private RaceTableDto raceTable;

    @JsonProperty("DriverTable")
    private DriverTableDto driverTable;

    @JsonProperty("ConstructorTable")
    private ConstructorTableDto constructorTable;

    @JsonProperty("SeasonTable")
    private SeasonTableDto seasonTable;
}
