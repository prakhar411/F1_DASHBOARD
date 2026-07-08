package com.f1dashboard.backend.controller;

import com.f1dashboard.backend.dto.response.LastRaceRecapDto;
import com.f1dashboard.backend.dto.response.RaceDto;
import com.f1dashboard.backend.service.RaceResultService;
import com.f1dashboard.backend.service.RaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    private final RaceService raceService;
    private final RaceResultService raceResultService;

    public CalendarController(RaceService raceService, RaceResultService raceResultService) {
        this.raceService = raceService;
        this.raceResultService = raceResultService;
    }

    @GetMapping
    public List<RaceDto> calendar() {
        return raceService.getCalendar();
    }

    @GetMapping("/next")
    public ResponseEntity<RaceDto> nextRace() {
        return raceService.getNextRace()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @GetMapping("/last-result")
    public ResponseEntity<LastRaceRecapDto> lastResult() {
        return raceResultService.getLastRaceRecap()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }
}
