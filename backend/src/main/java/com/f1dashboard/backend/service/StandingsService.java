package com.f1dashboard.backend.service;

import com.f1dashboard.backend.dto.response.ConstructorStandingDto;
import com.f1dashboard.backend.dto.response.DriverStandingDto;

import java.util.List;

public interface StandingsService {

    List<DriverStandingDto> getDriverStandings();

    List<ConstructorStandingDto> getConstructorStandings();

}
