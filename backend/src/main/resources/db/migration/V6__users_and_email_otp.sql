CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    is_new_to_f1 BOOLEAN NOT NULL DEFAULT TRUE,
    favorite_team VARCHAR(50),
    favorite_driver VARCHAR(50),
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    UNIQUE KEY uq_users_username (username),
    UNIQUE KEY uq_users_email (email)
);

CREATE TABLE email_otps (
    email VARCHAR(150) NOT NULL PRIMARY KEY,
    otp_hash VARCHAR(100) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    attempt_count INT NOT NULL DEFAULT 0,
    last_sent_at TIMESTAMP NOT NULL
);
