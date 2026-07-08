package com.f1dashboard.backend.service;

import com.f1dashboard.backend.dto.response.DriverDto;

import java.util.List;

public interface DriverService {

    List<DriverDto> getDrivers();

}
