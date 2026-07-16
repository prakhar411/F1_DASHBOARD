package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.dto.response.ProfileDto;
import com.f1dashboard.backend.entity.User;
import com.f1dashboard.backend.exception.AuthException;
import com.f1dashboard.backend.repository.UserRepository;
import com.f1dashboard.backend.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;

    public ProfileServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ProfileDto getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException(HttpStatus.NOT_FOUND, null, "Account not found"));

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
