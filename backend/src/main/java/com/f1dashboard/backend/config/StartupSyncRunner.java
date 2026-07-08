package com.f1dashboard.backend.config;

import com.f1dashboard.backend.service.SyncService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupSyncRunner implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(StartupSyncRunner.class);

    private final SyncService syncService;

    public StartupSyncRunner(SyncService syncService) {
        this.syncService = syncService;
    }

    @Override
    public void run(ApplicationArguments args) {
        try {
            syncService.syncAll();
        } catch (Exception e) {
            log.error("Initial F1 data sync failed on startup", e);
        }
    }
}
