package com.f1dashboard.backend.controller;

import com.f1dashboard.backend.dto.response.ConstructorStandingDto;
import com.f1dashboard.backend.dto.response.DriverStandingDto;
import com.f1dashboard.backend.service.StandingsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/standings")
public class StandingsController {

    private final StandingsService standingsService;

    public StandingsController(StandingsService standingsService) {
        this.standingsService = standingsService;
    }

    @GetMapping("/drivers")
    public List<DriverStandingDto> driverStandings() {
        return standingsService.getDriverStandings();
    }

    @GetMapping("/constructors")
    public List<ConstructorStandingDto> constructorStandings() {
        return standingsService.getConstructorStandings();
    }
}
