package com.f1dashboard.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResendOtpRequestDto {

    @NotBlank(message = "Email is required")
    private String email;
}
