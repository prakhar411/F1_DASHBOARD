package com.f1dashboard.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LastRaceRecapDto {
    private Integer season;
    private Integer round;
    private String raceName;
    private List<PodiumFinisherDto> podium;
}
