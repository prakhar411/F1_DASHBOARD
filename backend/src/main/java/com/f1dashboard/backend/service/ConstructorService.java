package com.f1dashboard.backend.service;

import com.f1dashboard.backend.dto.response.ConstructorDto;

import java.util.List;

public interface ConstructorService {

    List<ConstructorDto> getConstructors();

}
