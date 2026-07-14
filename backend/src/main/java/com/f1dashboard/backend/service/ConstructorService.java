package com.f1dashboard.backend.service;

import com.f1dashboard.backend.dto.response.ConstructorDto;
import com.f1dashboard.backend.dto.response.TeamDetailDto;

import java.util.List;
import java.util.Optional;

public interface ConstructorService {

    List<ConstructorDto> getConstructors();

    Optional<TeamDetailDto> getTeamDetail(String constructorId);

}
