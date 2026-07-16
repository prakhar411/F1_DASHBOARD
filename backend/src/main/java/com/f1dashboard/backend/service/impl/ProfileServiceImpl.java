package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.dto.request.UpdateFavoritesRequestDto;
import com.f1dashboard.backend.dto.response.ProfileDto;
import com.f1dashboard.backend.entity.User;
import com.f1dashboard.backend.exception.AuthException;
import com.f1dashboard.backend.repository.UserRepository;
import com.f1dashboard.backend.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;

    public ProfileServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ProfileDto getProfile(String email) {
        return toDto(findUser(email));
    }

    @Override
    @Transactional
    public ProfileDto updateFavorites(String email, UpdateFavoritesRequestDto request) {
        User user = findUser(email);
        if (request.getFavoriteTeam() != null && !request.getFavoriteTeam().isBlank()) {
            user.setFavoriteTeam(request.getFavoriteTeam().trim());
        }
        if (request.getFavoriteDriver() != null && !request.getFavoriteDriver().isBlank()) {
            user.setFavoriteDriver(request.getFavoriteDriver().trim());
        }
        return toDto(userRepository.save(user));
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException(HttpStatus.NOT_FOUND, null, "Account not found"));
    }

    private ProfileDto toDto(User user) {
        return new ProfileDto(
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                user.getNewToF1(),
                user.getFavoriteTeam(),
                user.getFavoriteDriver()
        );
    }
}
