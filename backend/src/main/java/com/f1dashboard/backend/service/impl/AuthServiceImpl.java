package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.dto.request.LoginRequestDto;
import com.f1dashboard.backend.dto.request.RegisterRequestDto;
import com.f1dashboard.backend.dto.response.AuthResponseDto;
import com.f1dashboard.backend.dto.response.UsernameAvailabilityDto;
import com.f1dashboard.backend.entity.EmailOtp;
import com.f1dashboard.backend.entity.User;
import com.f1dashboard.backend.exception.AuthException;
import com.f1dashboard.backend.repository.EmailOtpRepository;
import com.f1dashboard.backend.repository.UserRepository;
import com.f1dashboard.backend.service.AuthService;
import com.f1dashboard.backend.service.EmailService;
import com.f1dashboard.backend.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private static final int OTP_EXPIRY_MINUTES = 10;
    private static final int MAX_OTP_ATTEMPTS = 5;
    private static final Duration RESEND_COOLDOWN = Duration.ofSeconds(30);

    private final UserRepository userRepository;
    private final EmailOtpRepository emailOtpRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final SecureRandom random = new SecureRandom();

    public AuthServiceImpl(UserRepository userRepository,
                            EmailOtpRepository emailOtpRepository,
                            PasswordEncoder passwordEncoder,
                            EmailService emailService,
                            JwtService jwtService) {
        this.userRepository = userRepository;
        this.emailOtpRepository = emailOtpRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }

    @Override
    @Transactional
    public AuthResponseDto register(RegisterRequestDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AuthException(HttpStatus.CONFLICT, "email", "This email is already registered");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AuthException(HttpStatus.CONFLICT, "username", "This username is already taken");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setNewToF1(request.getNewToF1());
        user.setFavoriteTeam(Boolean.TRUE.equals(request.getNewToF1()) ? null : request.getFavoriteTeam());
        user.setFavoriteDriver(Boolean.TRUE.equals(request.getNewToF1()) ? null : request.getFavoriteDriver());
        // OTP email verification is temporarily bypassed (Brevo delivery to Gmail is being rate-limited
        // pending a verified custom domain) — auto-verify and log straight in. The OTP infra below
        // (verifyOtp/resendOtp) is left in place, dormant, to re-enable once delivery is reliable.
        user.setEmailVerified(true);
        user.setCreatedAt(Instant.now());
        userRepository.save(user);

        return new AuthResponseDto(jwtService.generateToken(user.getEmail()), user.getFullName());
    }

    @Override
    public UsernameAvailabilityDto checkUsernameAvailability(String username) {
        return new UsernameAvailabilityDto(!userRepository.existsByUsername(username));
    }

    @Override
    @Transactional
    public AuthResponseDto verifyOtp(String email, String otp) {
        EmailOtp record = emailOtpRepository.findById(email)
                .orElseThrow(() -> new AuthException(HttpStatus.BAD_REQUEST, "otp", "No verification code found for this email"));

        if (record.getExpiresAt().isBefore(Instant.now())) {
            throw new AuthException(HttpStatus.BAD_REQUEST, "otp", "Code expired — request a new one");
        }
        if (record.getAttemptCount() >= MAX_OTP_ATTEMPTS) {
            throw new AuthException(HttpStatus.BAD_REQUEST, "otp", "Too many attempts — request a new code");
        }
        if (!passwordEncoder.matches(otp, record.getOtpHash())) {
            record.setAttemptCount(record.getAttemptCount() + 1);
            emailOtpRepository.save(record);
            throw new AuthException(HttpStatus.BAD_REQUEST, "otp", "Invalid code");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException(HttpStatus.BAD_REQUEST, null, "Account not found"));
        user.setEmailVerified(true);
        userRepository.save(user);
        emailOtpRepository.delete(record);

        return new AuthResponseDto(jwtService.generateToken(email), user.getFullName());
    }

    @Override
    @Transactional
    public void resendOtp(String email) {
        Optional<EmailOtp> existing = emailOtpRepository.findById(email);
        if (existing.isPresent()) {
            Duration sinceLastSend = Duration.between(existing.get().getLastSentAt(), Instant.now());
            if (sinceLastSend.compareTo(RESEND_COOLDOWN) < 0) {
                throw new AuthException(HttpStatus.TOO_MANY_REQUESTS, null,
                        "Please wait before requesting another code");
            }
        }
        issueAndSendOtp(email);
    }

    @Override
    public AuthResponseDto login(LoginRequestDto request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        boolean passwordMatches = user != null && passwordEncoder.matches(request.getPassword(), user.getPasswordHash());
        if (!passwordMatches) {
            throw new AuthException(HttpStatus.UNAUTHORIZED, null, "Invalid email or password");
        }
        if (!Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new AuthException(HttpStatus.FORBIDDEN, "email_unverified", "Please verify your email before logging in");
        }

        return new AuthResponseDto(jwtService.generateToken(user.getEmail()), user.getFullName());
    }

    private void issueAndSendOtp(String email) {
        String otp = generateOtp();

        EmailOtp record = emailOtpRepository.findById(email).orElseGet(EmailOtp::new);
        record.setEmail(email);
        record.setOtpHash(passwordEncoder.encode(otp));
        record.setExpiresAt(Instant.now().plusSeconds(OTP_EXPIRY_MINUTES * 60L));
        record.setAttemptCount(0);
        record.setLastSentAt(Instant.now());
        emailOtpRepository.save(record);

        emailService.sendOtp(email, otp);
    }

    private String generateOtp() {
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }
}
