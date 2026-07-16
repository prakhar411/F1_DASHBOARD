package com.f1dashboard.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "email_otps")
@Getter
@Setter
@NoArgsConstructor
public class EmailOtp {

    @Id
    private String email;

    @Column(name = "otp_hash")
    private String otpHash;

    @Column(name = "expires_at")
    private Instant expiresAt;

    @Column(name = "attempt_count")
    private Integer attemptCount;

    @Column(name = "last_sent_at")
    private Instant lastSentAt;
}
