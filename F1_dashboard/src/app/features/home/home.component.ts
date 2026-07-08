import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { CalendarService, LastRaceRecap, Race } from '../../core/services/calendar.service';
import { DriverStanding, StandingsService } from '../../core/services/standings.service';
import { Team, TeamService } from '../../core/services/team.service';
import { teamColor } from '../../core/constants/team-colors';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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

  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef<HTMLElement>>;
  private observer?: IntersectionObserver;
  private countdownSubscription?: Subscription;

  constructor(
    private calendarService: CalendarService,
    private standingsService: StandingsService,
    private teamService: TeamService
  ) { }

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
}
