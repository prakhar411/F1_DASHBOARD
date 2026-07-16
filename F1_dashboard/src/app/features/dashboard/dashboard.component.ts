import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile, ProfileService } from '../../core/services/profile.service';
import { AuthService } from '../../core/services/auth.service';
import { ConstructorStanding, DriverStanding, StandingsService } from '../../core/services/standings.service';
import { CalendarService, LastRaceRecap } from '../../core/services/calendar.service';
import { teamColor } from '../../core/constants/team-colors';
import { driverPhoto } from '../../core/constants/driver-photos';
import { DriverDetailModalComponent } from '../../shared/driver-detail-modal/driver-detail-modal.component';
import { FavoritePickerModalComponent } from '../../shared/favorite-picker-modal/favorite-picker-modal.component';
import { LearningProgressService } from '../../core/services/learning-progress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profile: Profile | null = null;
  loading = true;

  topStandings: DriverStanding[] = [];
  allStandings: DriverStanding[] = [];
  constructorStandings: ConstructorStanding[] = [];
  spotlightDriver: DriverStanding | null = null;
  lastRaceRecap: LastRaceRecap | null = null;

  teamColor = teamColor;
  driverPhoto = driverPhoto;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private standingsService: StandingsService,
    private calendarService: CalendarService,
    private modalService: NgbModal,
    private router: Router,
    public learning: LearningProgressService
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

  openFavoritePicker(mode: 'team' | 'driver'): void {
    const ref = this.modalService.open(FavoritePickerModalComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'driver-modal'
    });
    ref.componentInstance.mode = mode;
    ref.componentInstance.current = mode === 'team'
      ? this.profile?.favoriteTeam ?? null
      : this.profile?.favoriteDriver ?? null;
    ref.closed.subscribe((updated: Profile) => this.profile = updated);
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

  /** 2-3 plain-language sentences a brand-new fan can read instead of a standings table. */
  get seasonStory(): string | null {
    if (this.allStandings.length < 2) {
      return null;
    }
    const leader = this.allStandings[0];
    const second = this.allStandings[1];
    const gap = leader.points - second.points;
    const racesRun = this.allStandings.reduce((sum, d) => sum + d.wins, 0);

    let story = `${leader.givenName} ${leader.familyName} leads the championship with ${leader.points} points`
      + (gap > 0 ? `, ${gap} clear of ${second.givenName} ${second.familyName}.` : `, level on points with ${second.givenName} ${second.familyName}.`);

    const mostWins = [...this.allStandings].sort((a, b) => b.wins - a.wins)[0];
    if (mostWins.wins > 0) {
      story += mostWins.driverId === leader.driverId
        ? ` ${leader.familyName} has won ${mostWins.wins} of the ${racesRun} races so far.`
        : ` ${mostWins.givenName} ${mostWins.familyName} has the most wins (${mostWins.wins} of ${racesRun}).`;
    }

    if (this.constructorStandings.length >= 2) {
      const teamLeader = this.constructorStandings[0];
      const teamSecond = this.constructorStandings[1];
      story += ` In the teams' battle, ${teamLeader.name} lead ${teamSecond.name} by ${teamLeader.points - teamSecond.points} points.`;
    }
    return story;
  }

  private loadNewToF1Content(): void {
    this.standingsService.getDriverStandings().subscribe(data => {
      this.allStandings = data;
      this.topStandings = data.slice(0, 3);
      this.pickSpotlight(data);
    });
    this.standingsService.getConstructorStandings().subscribe({
      next: (data) => this.constructorStandings = data,
      error: () => this.constructorStandings = []
    });
    this.calendarService.getLastRaceRecap().subscribe({
      next: (recap) => this.lastRaceRecap = recap,
      error: () => this.lastRaceRecap = null
    });
  }

  /** Rotates per visit: a random driver from outside the podium, so the dashboard isn't all top-3. */
  private pickSpotlight(standings: DriverStanding[]): void {
    const pool = standings.length > 3 ? standings.slice(3) : standings;
    if (!pool.length) {
      this.spotlightDriver = null;
      return;
    }
    this.spotlightDriver = pool[Math.floor(Math.random() * pool.length)];
  }
}
