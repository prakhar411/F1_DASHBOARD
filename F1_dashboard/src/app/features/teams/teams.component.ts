import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Team, TeamService } from '../../core/services/team.service';
import { Driver, DriverService } from '../../core/services/driver.service';
import { teamColor } from '../../core/constants/team-colors';
import { driverPhoto } from '../../core/constants/driver-photos';
import { DriverDetailModalComponent } from '../../shared/driver-detail-modal/driver-detail-modal.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];
  loading = true;
  teamColor = teamColor;
  driverPhoto = driverPhoto;

  private driversByTeam = new Map<string, Driver[]>();

  constructor(
    private teamService: TeamService,
    private driverService: DriverService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    forkJoin({
      teams: this.teamService.getTeams(),
      drivers: this.driverService.getDrivers()
    }).subscribe(({ teams, drivers }) => {
      this.teams = teams;
      for (const d of drivers.filter(x => x.current && x.constructorId)) {
        const list = this.driversByTeam.get(d.constructorId!) ?? [];
        list.push(d);
        this.driversByTeam.set(d.constructorId!, list);
      }
      this.loading = false;
    });
  }

  lineup(constructorId: string | null): Driver[] {
    return constructorId ? (this.driversByTeam.get(constructorId) ?? []) : [];
  }

  openDriver(driverId: string | null): void {
    if (!driverId) {
      return;
    }
    const ref = this.modalService.open(DriverDetailModalComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'driver-modal'
    });
    ref.componentInstance.driverId = driverId;
  }
}
