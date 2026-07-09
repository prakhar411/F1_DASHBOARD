CREATE TABLE driver_career_stats (
    driver_id VARCHAR(50) NOT NULL,
    career_wins INT NOT NULL DEFAULT 0,
    career_podiums INT NOT NULL DEFAULT 0,
    championships INT NOT NULL DEFAULT 0,
    career_points DECIMAL(8,2),
    seasons_count INT,
    first_season INT,
    current_team_since INT,
    previous_teams_json TEXT,
    fetched_at TIMESTAMP NOT NULL,
    PRIMARY KEY (driver_id),
    CONSTRAINT fk_dcs_driver FOREIGN KEY (driver_id) REFERENCES drivers (driver_id)
);
