package com.f1dashboard.backend.repository;

import com.f1dashboard.backend.entity.EmailOtp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailOtpRepository extends JpaRepository<EmailOtp, String> {
}
