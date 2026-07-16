import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DriverDetail, DriverService } from '../../core/services/driver.service';
import { teamColor } from '../../core/constants/team-colors';
import { driverPhoto } from '../../core/constants/driver-photos';

@Component({
  selector: 'app-driver-detail-modal',
  templateUrl: './driver-detail-modal.component.html',
  styleUrls: ['./driver-detail-modal.component.css']
})
export class DriverDetailModalComponent implements OnInit {

  @Input() driverId!: string;

  detail: DriverDetail | null = null;
  loading = true;
  failed = false;

  teamColor = teamColor;
  driverPhoto = driverPhoto;

  constructor(public activeModal: NgbActiveModal, private driverService: DriverService) { }

  ngOnInit(): void {
    this.driverService.getDriverDetail(this.driverId).subscribe({
      next: (detail) => {
        this.detail = detail;
        this.loading = false;
      },
      error: () => {
        this.failed = true;
        this.loading = false;
      }
    });
  }

  get age(): number | null {
    if (!this.detail?.dateOfBirth) {
      return null;
    }
    const dob = new Date(this.detail.dateOfBirth);
    const diff = Date.now() - dob.getTime();
    return Math.floor(diff / (365.25 * 24 * 3600 * 1000));
  }

  statPct(value: number | null | undefined, cap: number): number {
    if (value === null || value === undefined || value <= 0) {
      return 4;
    }
    return Math.max(4, Math.min(100, (value / cap) * 100));
  }
}
