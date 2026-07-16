package com.f1dashboard.backend.service;

import com.f1dashboard.backend.dto.request.LoginRequestDto;
import com.f1dashboard.backend.dto.request.RegisterRequestDto;
import com.f1dashboard.backend.dto.response.AuthResponseDto;
import com.f1dashboard.backend.dto.response.UsernameAvailabilityDto;

public interface AuthService {

    AuthResponseDto register(RegisterRequestDto request);

    UsernameAvailabilityDto checkUsernameAvailability(String username);

    AuthResponseDto verifyOtp(String email, String otp);

    void resendOtp(String email);

    AuthResponseDto login(LoginRequestDto request);
}
