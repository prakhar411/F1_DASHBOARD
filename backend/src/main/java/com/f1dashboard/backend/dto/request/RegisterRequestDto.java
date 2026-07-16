package com.f1dashboard.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDto {

    @NotBlank(message = "Full name is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Name can only contain letters and spaces")
    private String fullName;

    @NotBlank(message = "Username is required")
    @Pattern(
            regexp = "^(?!.*__)[a-z][a-z0-9_]{1,18}[a-z0-9]$",
            message = "Username must be 3-20 chars, start with a letter, and contain only lowercase letters, numbers, and single underscores"
    )
    private String username;

    @NotBlank(message = "Email is required")
    @Pattern(
            regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z]{2,}$",
            message = "Enter a valid email address"
    )
    private String email;

    @NotBlank(message = "Password is required")
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d).{8,}$",
            message = "Password must be at least 8 characters and include a letter and a number"
    )
    private String password;

    @NotNull(message = "This field is required")
    private Boolean newToF1;

    private String favoriteTeam;

    private String favoriteDriver;
}
