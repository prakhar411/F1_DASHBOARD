package com.f1dashboard.backend.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Partial update — only non-null fields are applied, so a client can set
 * the team, the driver, or both in one call.
 */
@Getter
@Setter
@NoArgsConstructor
public class UpdateFavoritesRequestDto {
    private String favoriteTeam;
    private String favoriteDriver;
}
