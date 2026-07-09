package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class DriverDetailDto {
    private String driverId;
    private String code;
    private Integer permanentNumber;
    private String givenName;
    private String familyName;
    private String nationality;
    private LocalDate dateOfBirth;

    private String constructorId;
    private String constructorName;

    private Integer standingPosition;
    private BigDecimal standingPoints;
    private Integer seasonWins;
    private String seasonBestLapTime;

    private Integer careerWins;
    private Integer careerPodiums;
    private Integer championships;
    private BigDecimal careerPoints;
    private Integer seasonsCount;
    private Integer firstSeason;
    private Integer currentTeamSince;
    private List<TeamStintDto> previousTeams;

    private DriverLastRaceDto lastRace;
}
