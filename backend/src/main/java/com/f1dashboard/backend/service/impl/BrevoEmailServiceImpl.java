package com.f1dashboard.backend.service.impl;

import com.f1dashboard.backend.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class BrevoEmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(BrevoEmailServiceImpl.class);
    private static final String BREVO_URL = "https://api.brevo.com/v3/smtp/email";

    private final String apiKey;
    private final String fromEmail;
    private final String fromName;
    private final RestClient restClient;

    public BrevoEmailServiceImpl(@Value("${app.brevo.api-key}") String apiKey,
                                  @Value("${app.brevo.from-email}") String fromEmail,
                                  @Value("${app.brevo.from-name}") String fromName) {
        this.apiKey = apiKey;
        this.fromEmail = fromEmail;
        this.fromName = fromName;
        this.restClient = RestClient.builder().baseUrl(BREVO_URL).build();
    }

    @Override
    public void sendOtp(String toEmail, String otp) {
        String html = "<p>Your PitWall verification code is:</p>"
                + "<h2 style=\"letter-spacing:4px\">" + otp + "</h2>"
                + "<p>This code expires in 10 minutes.</p>";

        if (apiKey == null || apiKey.isBlank()) {
            // No Brevo API key configured yet — log instead of failing, so registration can
            // still be tested end-to-end locally before real email sending is wired up.
            log.warn("BREVO_API_KEY not set — OTP for {} is: {}", toEmail, otp);
            return;
        }

        try {
            restClient.post()
                    .header("api-key", apiKey)
                    .header("Accept", MediaType.APPLICATION_JSON_VALUE)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of(
                            "sender", Map.of("name", fromName, "email", fromEmail),
                            "to", List.of(Map.of("email", toEmail)),
                            "subject", "Your PitWall verification code",
                            "htmlContent", html
                    ))
                    .retrieve()
                    .toBodilessEntity();
        } catch (Exception e) {
            // Never let an email-provider hiccup (unverified sender, rate limits, outages)
            // break registration/OTP issuance — the OTP is already saved, so log it as a
            // fallback and let the user retry delivery via resend-otp once the issue clears.
            log.warn("Failed to send OTP email to {} via Brevo — OTP is: {}", toEmail, otp, e);
        }
    }
}
