package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProfileDto {
    private String fullName;
    private String username;
    private String email;
    private Boolean newToF1;
    private String favoriteTeam;
    private String favoriteDriver;
}
