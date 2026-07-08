CREATE TABLE constructors (
    constructor_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    nationality VARCHAR(50),
    url VARCHAR(255),
    PRIMARY KEY (constructor_id)
);

CREATE TABLE drivers (
    driver_id VARCHAR(50) NOT NULL,
    code VARCHAR(10),
    permanent_number INT,
    given_name VARCHAR(100) NOT NULL,
    family_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    nationality VARCHAR(50),
    url VARCHAR(255),
    PRIMARY KEY (driver_id)
);

CREATE TABLE races (
    id BIGINT NOT NULL AUTO_INCREMENT,
    season INT NOT NULL,
    round INT NOT NULL,
    race_name VARCHAR(150) NOT NULL,
    circuit_id VARCHAR(50),
    circuit_name VARCHAR(150),
    locality VARCHAR(100),
    country VARCHAR(100),
    race_date DATE NOT NULL,
    race_time TIME NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_races_season_round (season, round)
);

CREATE TABLE constructor_standings (
    id BIGINT NOT NULL AUTO_INCREMENT,
    season INT NOT NULL,
    constructor_id VARCHAR(50) NOT NULL,
    position INT NOT NULL,
    points DECIMAL(6,2) NOT NULL,
    wins INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_constructor_standings_season_constructor (season, constructor_id),
    CONSTRAINT fk_cs_constructor FOREIGN KEY (constructor_id) REFERENCES constructors (constructor_id)
);

CREATE TABLE driver_standings (
    id BIGINT NOT NULL AUTO_INCREMENT,
    season INT NOT NULL,
    driver_id VARCHAR(50) NOT NULL,
    constructor_id VARCHAR(50),
    position INT NOT NULL,
    points DECIMAL(6,2) NOT NULL,
    wins INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_driver_standings_season_driver (season, driver_id),
    CONSTRAINT fk_ds_driver FOREIGN KEY (driver_id) REFERENCES drivers (driver_id),
    CONSTRAINT fk_ds_constructor FOREIGN KEY (constructor_id) REFERENCES constructors (constructor_id)
);
