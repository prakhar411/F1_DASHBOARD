package com.f1dashboard.backend.controller;

import com.f1dashboard.backend.dto.request.UpdateFavoritesRequestDto;
import com.f1dashboard.backend.dto.response.ProfileDto;
import com.f1dashboard.backend.service.ProfileService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        return profileService.getProfile(currentEmail());
    }

    @PatchMapping("/favorites")
    public ProfileDto updateFavorites(@RequestBody UpdateFavoritesRequestDto request) {
        return profileService.updateFavorites(currentEmail(), request);
    }

    private String currentEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
