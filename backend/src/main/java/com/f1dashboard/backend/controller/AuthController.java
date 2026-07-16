package com.f1dashboard.backend.controller;

import com.f1dashboard.backend.dto.request.LoginRequestDto;
import com.f1dashboard.backend.dto.request.RegisterRequestDto;
import com.f1dashboard.backend.dto.request.ResendOtpRequestDto;
import com.f1dashboard.backend.dto.request.VerifyOtpRequestDto;
import com.f1dashboard.backend.dto.response.AuthResponseDto;
import com.f1dashboard.backend.dto.response.MessageResponseDto;
import com.f1dashboard.backend.dto.response.UsernameAvailabilityDto;
import com.f1dashboard.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponseDto register(@Valid @RequestBody RegisterRequestDto request) {
        return authService.register(request);
    }

    @GetMapping("/username-available")
    public UsernameAvailabilityDto usernameAvailable(@RequestParam String username) {
        return authService.checkUsernameAvailability(username);
    }

    @PostMapping("/verify-otp")
    public AuthResponseDto verifyOtp(@Valid @RequestBody VerifyOtpRequestDto request) {
        return authService.verifyOtp(request.getEmail(), request.getOtp());
    }

    @PostMapping("/resend-otp")
    public MessageResponseDto resendOtp(@Valid @RequestBody ResendOtpRequestDto request) {
        authService.resendOtp(request.getEmail());
        return new MessageResponseDto("Verification code resent");
    }

    @PostMapping("/login")
    public AuthResponseDto login(@Valid @RequestBody LoginRequestDto request) {
        return authService.login(request);
    }
}
