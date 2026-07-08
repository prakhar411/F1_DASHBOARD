package com.f1dashboard.backend.client.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class JolpicaConstructorDto {
    private String constructorId;
    private String name;
    private String nationality;
    private String url;
}
