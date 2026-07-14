ALTER TABLE drivers ADD COLUMN is_current BOOLEAN NOT NULL DEFAULT TRUE;

CREATE TABLE circuit_winners (
    circuit_id VARCHAR(50) NOT NULL,
    season INT NOT NULL,
    race_name VARCHAR(150),
    driver_id VARCHAR(50),
    driver_name VARCHAR(150),
    constructor_name VARCHAR(100),
    fastest_lap_time VARCHAR(20),
    fetched_at TIMESTAMP NOT NULL,
    PRIMARY KEY (circuit_id)
);

CREATE TABLE sync_markers (
    marker_key VARCHAR(100) NOT NULL,
    completed_at TIMESTAMP NOT NULL,
    PRIMARY KEY (marker_key)
);
