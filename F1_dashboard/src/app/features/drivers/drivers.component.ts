import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Driver, DriverService } from '../../core/services/driver.service';
import { teamColor } from '../../core/constants/team-colors';
import { DriverDetailModalComponent } from '../../shared/driver-detail-modal/driver-detail-modal.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  drivers: Driver[] = [];
  loading = true;
  teamColor = teamColor;

  constructor(private driverService: DriverService, private modalService: NgbModal) { }

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
    this.driverService.getDrivers().subscribe(data => {
      this.drivers = data;
      this.loading = false;
    });
  }
}
