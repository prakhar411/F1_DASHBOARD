import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamDetail, TeamService } from '../../core/services/team.service';
import { teamColor } from '../../core/constants/team-colors';
import { teamCarImage } from '../../core/constants/team-cars';
import { teamLogo } from '../../core/constants/team-logos';
import { DriverDetailModalComponent } from '../driver-detail-modal/driver-detail-modal.component';

@Component({
  selector: 'app-team-detail-modal',
  templateUrl: './team-detail-modal.component.html',
  styleUrls: ['./team-detail-modal.component.css']
})
export class TeamDetailModalComponent implements OnInit {

  @Input() constructorId!: string;
  @Input() name = '';
  @Input() nationality: string | null = null;

  detail: TeamDetail | null = null;
  loading = true;
  failed = false;

  teamColor = teamColor;
  teamCarImage = teamCarImage;
  teamLogo = teamLogo;

  constructor(
    public activeModal: NgbActiveModal,
    private teamService: TeamService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.teamService.getTeamDetail(this.constructorId).subscribe({
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

  openDriver(driverId: string): void {
    const ref = this.modalService.open(DriverDetailModalComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'driver-modal'
    });
    ref.componentInstance.driverId = driverId;
  }
}
