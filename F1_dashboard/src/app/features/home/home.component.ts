import { Component, OnInit } from '@angular/core';
import { HealthService, HealthStatus } from '../../core/services/health.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  health: HealthStatus | null = null;
  healthError = false;

  constructor(private healthService: HealthService) { }

  ngOnInit(): void {
    this.healthService.checkHealth().subscribe({
      next: (status) => this.health = status,
      error: () => this.healthError = true
    });
  }
}
