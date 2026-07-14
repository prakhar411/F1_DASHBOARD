package com.f1dashboard.backend.controller;

import com.f1dashboard.backend.dto.response.ConstructorDto;
import com.f1dashboard.backend.dto.response.TeamDetailDto;
import com.f1dashboard.backend.service.ConstructorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final ConstructorService constructorService;

    public TeamController(ConstructorService constructorService) {
        this.constructorService = constructorService;
    }

    @GetMapping
    public List<ConstructorDto> teams() {
        return constructorService.getConstructors();
    }

    @GetMapping("/{constructorId}/detail")
    public ResponseEntity<TeamDetailDto> teamDetail(@PathVariable String constructorId) {
        return constructorService.getTeamDetail(constructorId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
