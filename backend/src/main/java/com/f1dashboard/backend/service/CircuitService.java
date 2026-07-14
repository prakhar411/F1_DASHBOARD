package com.f1dashboard.backend.service;

import com.f1dashboard.backend.dto.response.CircuitWinnerDto;

import java.util.Optional;

public interface CircuitService {

    Optional<CircuitWinnerDto> getLastSeasonWinner(String circuitId);

}
