import { Component, OnInit } from '@angular/core';
import { Team, TeamService } from '../../core/services/team.service';
import { teamColor } from '../../core/constants/team-colors';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];
  loading = true;
  teamColor = teamColor;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(data => {
      this.teams = data;
      this.loading = false;
    });
  }
}
