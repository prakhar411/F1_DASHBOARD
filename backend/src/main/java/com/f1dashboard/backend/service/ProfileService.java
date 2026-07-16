package com.f1dashboard.backend.service;

import com.f1dashboard.backend.dto.request.UpdateFavoritesRequestDto;
import com.f1dashboard.backend.dto.response.ProfileDto;

public interface ProfileService {

    ProfileDto getProfile(String email);

    ProfileDto updateFavorites(String email, UpdateFavoritesRequestDto request);
}
