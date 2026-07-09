package com.f1dashboard.backend.service;

import com.f1dashboard.backend.dto.response.DriverDetailDto;

import java.util.Optional;

public interface DriverDetailService {

    Optional<DriverDetailDto> getDriverDetail(String driverId);

}
