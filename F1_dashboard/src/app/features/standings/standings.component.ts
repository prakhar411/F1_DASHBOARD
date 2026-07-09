import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstructorStanding, DriverStanding, StandingsService } from '../../core/services/standings.service';
import { teamColor } from '../../core/constants/team-colors';
import { DriverDetailModalComponent } from '../../shared/driver-detail-modal/driver-detail-modal.component';

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

  constructor(private standingsService: StandingsService, private modalService: NgbModal) { }

  openDriver(driverId: string | null): void {
    if (!driverId) {
      return;
    }
    const ref = this.modalService.open(DriverDetailModalComponent, {
      centered: true,
      windowClass: 'driver-modal'
    });
    ref.componentInstance.driverId = driverId;
  }

  ngOnInit(): void {
    this.standingsService.getDriverStandings().subscribe(data => this.driverStandings = data);
    this.standingsService.getConstructorStandings().subscribe(data => {
      this.constructorStandings = data;
      this.loading = false;
    });
  }
}
