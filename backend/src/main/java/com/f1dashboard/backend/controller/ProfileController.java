package com.f1dashboard.backend.controller;

import com.f1dashboard.backend.dto.response.ProfileDto;
import com.f1dashboard.backend.service.ProfileService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/me")
    public ProfileDto me() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return profileService.getProfile(email);
    }
}
