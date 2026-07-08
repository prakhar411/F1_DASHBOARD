CREATE TABLE race_results (
    id BIGINT NOT NULL AUTO_INCREMENT,
    race_id BIGINT NOT NULL,
    driver_id VARCHAR(50) NOT NULL,
    constructor_id VARCHAR(50),
    position INT,
    points DECIMAL(6,2),
    fastest_lap_time VARCHAR(20),
    fastest_lap_millis INT,
    fastest_lap_rank INT,
    PRIMARY KEY (id),
    UNIQUE KEY uq_race_results_race_driver (race_id, driver_id),
    CONSTRAINT fk_rr_race FOREIGN KEY (race_id) REFERENCES races (id),
    CONSTRAINT fk_rr_driver FOREIGN KEY (driver_id) REFERENCES drivers (driver_id),
    CONSTRAINT fk_rr_constructor FOREIGN KEY (constructor_id) REFERENCES constructors (constructor_id)
);
