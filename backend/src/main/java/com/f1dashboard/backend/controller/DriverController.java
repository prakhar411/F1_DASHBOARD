package com.f1dashboard.backend.controller;

import com.f1dashboard.backend.dto.response.DriverDto;
import com.f1dashboard.backend.service.DriverService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping
    public List<DriverDto> drivers() {
        return driverService.getDrivers();
    }
}
