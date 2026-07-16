import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile, ProfileService } from '../../core/services/profile.service';
import { AuthService } from '../../core/services/auth.service';
import { DriverStanding, StandingsService } from '../../core/services/standings.service';
import { CalendarService, LastRaceRecap } from '../../core/services/calendar.service';
import { teamColor } from '../../core/constants/team-colors';
import { driverPhoto } from '../../core/constants/driver-photos';
import { DriverDetailModalComponent } from '../../shared/driver-detail-modal/driver-detail-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profile: Profile | null = null;
  loading = true;

  topStandings: DriverStanding[] = [];
  lastRaceRecap: LastRaceRecap | null = null;

  teamColor = teamColor;
  driverPhoto = driverPhoto;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private standingsService: StandingsService,
    private calendarService: CalendarService,
    private modalService: NgbModal,
    private router: Router
  ) { }

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
    this.profileService.getMe().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.loading = false;
        if (profile.newToF1) {
          this.loadNewToF1Content();
        }
      },
      error: () => {
        // Expired/invalid token — back to login rather than showing a broken dashboard.
        this.authService.clearSession();
        this.router.navigateByUrl('/login');
      }
    });
  }

  get podiumP1(): DriverStanding | null {
    return this.topStandings.find(d => d.position === 1) ?? null;
  }
  get podiumP2(): DriverStanding | null {
    return this.topStandings.find(d => d.position === 2) ?? null;
  }
  get podiumP3(): DriverStanding | null {
    return this.topStandings.find(d => d.position === 3) ?? null;
  }

  get recapSummary(): string | null {
    const podium = this.lastRaceRecap?.podium;
    if (!podium || podium.length < 3) {
      return null;
    }
    const winner = podium.find(p => p.position === 1);
    const second = podium.find(p => p.position === 2);
    const third = podium.find(p => p.position === 3);
    if (!winner || !second || !third) {
      return null;
    }
    return `${winner.givenName} ${winner.familyName} won the ${this.lastRaceRecap!.raceName}, `
      + `with ${second.givenName} ${second.familyName} and ${third.givenName} ${third.familyName} `
      + `completing the podium.`;
  }

  private loadNewToF1Content(): void {
    this.standingsService.getDriverStandings().subscribe(data => this.topStandings = data.slice(0, 3));
    this.calendarService.getLastRaceRecap().subscribe({
      next: (recap) => this.lastRaceRecap = recap,
      error: () => this.lastRaceRecap = null
    });
  }
}
