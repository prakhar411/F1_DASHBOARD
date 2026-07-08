package com.f1dashboard.backend.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class JolpicaConstructorStandingDto {
    private String position;
    private String points;
    private String wins;

    @JsonProperty("Constructor")
    private JolpicaConstructorDto constructor;
}
