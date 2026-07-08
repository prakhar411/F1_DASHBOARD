package com.f1dashboard.backend.service;

import com.f1dashboard.backend.dto.response.RaceDto;

import java.util.List;
import java.util.Optional;

public interface RaceService {

    List<RaceDto> getCalendar();

    Optional<RaceDto> getNextRace();

}
