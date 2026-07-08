package com.f1dashboard.backend.service;

import com.f1dashboard.backend.dto.response.LastRaceRecapDto;

import java.util.Optional;

public interface RaceResultService {

    Optional<LastRaceRecapDto> getLastRaceRecap();

    void refreshCache();

}
