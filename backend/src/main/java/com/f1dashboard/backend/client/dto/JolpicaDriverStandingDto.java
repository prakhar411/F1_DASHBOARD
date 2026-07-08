package com.f1dashboard.backend.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class JolpicaDriverStandingDto {
    private String position;
    private String points;
    private String wins;

    @JsonProperty("Driver")
    private JolpicaDriverDto driver;

    @JsonProperty("Constructors")
    private List<JolpicaConstructorDto> constructors;
}
