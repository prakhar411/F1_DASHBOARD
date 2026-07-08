package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ConstructorDto {
    private String constructorId;
    private String name;
    private String nationality;
}
