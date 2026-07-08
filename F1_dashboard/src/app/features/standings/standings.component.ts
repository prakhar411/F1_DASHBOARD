import { Component, OnInit } from '@angular/core';
import { ConstructorStanding, DriverStanding, StandingsService } from '../../core/services/standings.service';
import { teamColor } from '../../core/constants/team-colors';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  driverStandings: DriverStanding[] = [];
  constructorStandings: ConstructorStanding[] = [];
  loading = true;
  teamColor = teamColor;

  constructor(private standingsService: StandingsService) { }

  ngOnInit(): void {
    this.standingsService.getDriverStandings().subscribe(data => this.driverStandings = data);
    this.standingsService.getConstructorStandings().subscribe(data => {
      this.constructorStandings = data;
      this.loading = false;
    });
  }
}
