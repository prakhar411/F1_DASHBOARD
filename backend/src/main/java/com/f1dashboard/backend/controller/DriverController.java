package com.f1dashboard.backend.controller;

import com.f1dashboard.backend.dto.response.DriverDetailDto;
import com.f1dashboard.backend.dto.response.DriverDto;
import com.f1dashboard.backend.service.DriverDetailService;
import com.f1dashboard.backend.service.DriverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;
    private final DriverDetailService driverDetailService;

    public DriverController(DriverService driverService, DriverDetailService driverDetailService) {
        this.driverService = driverService;
        this.driverDetailService = driverDetailService;
    }

    @GetMapping
    public List<DriverDto> drivers() {
        return driverService.getDrivers();
    }

    @GetMapping("/{driverId}/detail")
    public ResponseEntity<DriverDetailDto> driverDetail(@PathVariable String driverId) {
        return driverDetailService.getDriverDetail(driverId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
