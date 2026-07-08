package com.f1dashboard.backend.controller;

import com.f1dashboard.backend.service.SyncService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/sync")
public class SyncController {

    private final SyncService syncService;

    public SyncController(SyncService syncService) {
        this.syncService = syncService;
    }

    @PostMapping("/refresh")
    public Map<String, Object> refresh() {
        syncService.syncAll();
        return Map.of("status", "ok", "timestamp", Instant.now().toString());
    }
}
