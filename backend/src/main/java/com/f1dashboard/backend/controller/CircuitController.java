package com.f1dashboard.backend.controller;

import com.f1dashboard.backend.dto.response.CircuitWinnerDto;
import com.f1dashboard.backend.service.CircuitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/circuits")
public class CircuitController {

    private final CircuitService circuitService;

    public CircuitController(CircuitService circuitService) {
        this.circuitService = circuitService;
    }

    @GetMapping("/{circuitId}/last-winner")
    public ResponseEntity<CircuitWinnerDto> lastWinner(@PathVariable String circuitId) {
        return circuitService.getLastSeasonWinner(circuitId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }
}
