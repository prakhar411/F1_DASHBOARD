import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Driver, DriverService } from '../../core/services/driver.service';
import { teamColor } from '../../core/constants/team-colors';
import { driverPhoto } from '../../core/constants/driver-photos';
import { DriverDetailModalComponent } from '../../shared/driver-detail-modal/driver-detail-modal.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  currentDrivers: Driver[] = [];
  formerDrivers: Driver[] = [];
  loading = true;
  searchTerm = '';
  activeTab: 'current' | 'former' = 'current';
  teamColor = teamColor;
  driverPhoto = driverPhoto;

  constructor(private driverService: DriverService, private modalService: NgbModal) { }

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

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe(data => {
      this.currentDrivers = data.filter(d => d.current);
      this.formerDrivers = data.filter(d => !d.current);
      this.loading = false;
    });
  }

  get filteredFormerDrivers(): Driver[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.formerDrivers;
    }
    return this.formerDrivers.filter(d =>
      `${d.givenName} ${d.familyName}`.toLowerCase().includes(term)
      || (d.nationality ?? '').toLowerCase().includes(term)
    );
  }
}
