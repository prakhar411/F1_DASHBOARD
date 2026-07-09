import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, interval } from 'rxjs';
import { DriverDetailModalComponent } from '../../shared/driver-detail-modal/driver-detail-modal.component';
import { TrackDetailModalComponent } from '../../shared/track-detail-modal/track-detail-modal.component';
import { CalendarService, LastRaceRecap, Race } from '../../core/services/calendar.service';
import { DriverStanding, StandingsService } from '../../core/services/standings.service';
import { Team, TeamService } from '../../core/services/team.service';
import { teamColor } from '../../core/constants/team-colors';
import { driverPhoto } from '../../core/constants/driver-photos';
import { teamLogo } from '../../core/constants/team-logos';
import { circuitImage } from '../../core/constants/circuit-images';
import { teamCarImage } from '../../core/constants/team-cars';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const RING_RADIUS = 36;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  nextRace: Race | null = null;
  noUpcomingRace = false;
  countdown: Countdown | null = null;
  raceIsLive = false;

  topStandings: DriverStanding[] = [];
  teams: Team[] = [];
  lastRaceRecap: LastRaceRecap | null = null;

  teamColor = teamColor;
  driverPhoto = driverPhoto;
  teamLogo = teamLogo;
  circuitImage = circuitImage;
  teamCarImage = teamCarImage;

  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef<HTMLElement>>;
  private observer?: IntersectionObserver;
  private countdownSubscription?: Subscription;

  constructor(
    private calendarService: CalendarService,
    private standingsService: StandingsService,
    private teamService: TeamService,
    private modalService: NgbModal
  ) { }

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

  openTrack(race: Race): void {
    const ref = this.modalService.open(TrackDetailModalComponent, {
      centered: true,
      windowClass: 'driver-modal'
    });
    ref.componentInstance.circuitId = race.circuitId;
    ref.componentInstance.circuitName = race.circuitName;
    ref.componentInstance.locality = race.locality;
    ref.componentInstance.country = race.country;
    ref.componentInstance.raceName = race.raceName;
  }

  ngOnInit(): void {
    this.calendarService.getNextRace().subscribe({
      next: (race) => {
        if (race) {
          this.nextRace = race;
          this.countdownSubscription = interval(1000).subscribe(() => this.updateCountdown());
          this.updateCountdown();
        } else {
          this.noUpcomingRace = true;
        }
      },
      error: () => this.noUpcomingRace = true
    });

    this.standingsService.getDriverStandings().subscribe(data => this.topStandings = data.slice(0, 3));
    this.teamService.getTeams().subscribe(data => this.teams = data);
    this.calendarService.getLastRaceRecap().subscribe({
      next: (recap) => this.lastRaceRecap = recap,
      error: () => this.lastRaceRecap = null
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this.observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    this.observeRevealSections();
    this.revealSections.changes.subscribe(() => this.observeRevealSections());
  }

  ngOnDestroy(): void {
    this.countdownSubscription?.unsubscribe();
    this.observer?.disconnect();
  }

  private observeRevealSections(): void {
    this.revealSections.forEach(section => this.observer?.observe(section.nativeElement));
  }

  private updateCountdown(): void {
    if (!this.nextRace) {
      return;
    }
    const diffMs = new Date(this.nextRace.raceDateTimeUtc).getTime() - Date.now();
    if (diffMs <= 0) {
      this.raceIsLive = true;
      this.countdown = null;
      return;
    }
    const totalSeconds = Math.floor(diffMs / 1000);
    this.countdown = {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60
    };
  }

  get ringCircumference(): number {
    return RING_CIRCUMFERENCE;
  }

  ringOffset(value: number, max: number): number {
    const fraction = Math.min(Math.max(value, 0) / max, 1);
    return RING_CIRCUMFERENCE * (1 - fraction);
  }
}
