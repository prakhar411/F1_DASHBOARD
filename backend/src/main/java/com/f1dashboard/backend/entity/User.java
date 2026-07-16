package com.f1dashboard.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    private String username;

    private String email;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "is_new_to_f1")
    private Boolean newToF1;

    @Column(name = "favorite_team")
    private String favoriteTeam;

    @Column(name = "favorite_driver")
    private String favoriteDriver;

    @Column(name = "email_verified")
    private Boolean emailVerified;

    @Column(name = "created_at")
    private Instant createdAt;
}
