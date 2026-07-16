package com.f1dashboard.backend.service;

public interface JwtService {

    String generateToken(String email);

    String validateAndGetSubject(String token);
}
