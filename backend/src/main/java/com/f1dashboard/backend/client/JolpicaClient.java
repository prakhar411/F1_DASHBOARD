package com.f1dashboard.backend.client;

import com.f1dashboard.backend.client.dto.JolpicaConstructorDto;
import com.f1dashboard.backend.client.dto.JolpicaConstructorStandingDto;
import com.f1dashboard.backend.client.dto.JolpicaDriverDto;
import com.f1dashboard.backend.client.dto.JolpicaDriverStandingDto;
import com.f1dashboard.backend.client.dto.JolpicaRaceDto;
import com.f1dashboard.backend.client.dto.JolpicaResponseDto;
import com.f1dashboard.backend.client.dto.StandingsListDto;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class JolpicaClient {

    private static final String BASE_URL = "https://api.jolpi.ca/ergast/f1";

    private final RestClient restClient;

    public JolpicaClient() {
        this.restClient = RestClient.builder().baseUrl(BASE_URL).build();
    }

    public List<JolpicaDriverStandingDto> fetchCurrentDriverStandings() {
        JolpicaResponseDto response = get("/current/driverstandings/?limit=100");
        List<StandingsListDto> lists = response.getMrData().getStandingsTable().getStandingsLists();
        if (lists == null || lists.isEmpty()) {
            return Collections.emptyList();
        }
        return lists.get(0).getDriverStandings();
    }

    public List<JolpicaConstructorStandingDto> fetchCurrentConstructorStandings() {
        JolpicaResponseDto response = get("/current/constructorstandings/?limit=100");
        List<StandingsListDto> lists = response.getMrData().getStandingsTable().getStandingsLists();
        if (lists == null || lists.isEmpty()) {
            return Collections.emptyList();
        }
        return lists.get(0).getConstructorStandings();
    }

    public List<JolpicaRaceDto> fetchCurrentRaces() {
        JolpicaResponseDto response = get("/current/races/?limit=100");
        return response.getMrData().getRaceTable().getRaces();
    }

    public List<JolpicaDriverDto> fetchCurrentDrivers() {
        JolpicaResponseDto response = get("/current/drivers/?limit=100");
        return response.getMrData().getDriverTable().getDrivers();
    }

    public List<JolpicaConstructorDto> fetchCurrentConstructors() {
        JolpicaResponseDto response = get("/current/constructors/?limit=100");
        return response.getMrData().getConstructorTable().getConstructors();
    }

    public Optional<JolpicaRaceDto> fetchLastRaceResult() {
        JolpicaResponseDto response = get("/current/last/results/?limit=100");
        List<JolpicaRaceDto> races = response.getMrData().getRaceTable().getRaces();
        return races.isEmpty() ? Optional.empty() : Optional.of(races.get(0));
    }

    public Optional<JolpicaRaceDto> fetchRaceResults(int season, int round) {
        JolpicaResponseDto response = get("/" + season + "/" + round + "/results/?limit=100");
        List<JolpicaRaceDto> races = response.getMrData().getRaceTable().getRaces();
        return races.isEmpty() ? Optional.empty() : Optional.of(races.get(0));
    }

    private JolpicaResponseDto get(String path) {
        return restClient.get().uri(path).retrieve().body(JolpicaResponseDto.class);
    }
}
