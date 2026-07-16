import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, interval } from 'rxjs';
import { CalendarService, Race } from '../../core/services/calendar.service';
import { TrackDetailModalComponent } from '../track-detail-modal/track-detail-modal.component';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-next-race-card',
  templateUrl: './next-race-card.component.html',
  styleUrls: ['./next-race-card.component.css']
})
export class NextRaceCardComponent implements OnInit, OnDestroy {

  nextRace: Race | null = null;
  noUpcomingRace = false;
  countdown: Countdown | null = null;
  raceIsLive = false;
  tick = false;

  private countdownSubscription?: Subscription;

  constructor(private calendarService: CalendarService, private modalService: NgbModal) { }

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
  }

  ngOnDestroy(): void {
    this.countdownSubscription?.unsubscribe();
  }

  openTrack(): void {
    if (!this.nextRace) {
      return;
    }
    const ref = this.modalService.open(TrackDetailModalComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'driver-modal'
    });
    ref.componentInstance.circuitId = this.nextRace.circuitId;
    ref.componentInstance.circuitName = this.nextRace.circuitName;
    ref.componentInstance.locality = this.nextRace.locality;
    ref.componentInstance.country = this.nextRace.country;
    ref.componentInstance.raceName = this.nextRace.raceName;
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
    this.tick = !this.tick;
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  readonly gantryIndices = [0, 1, 2, 3, 4];

  /** Maps time remaining onto the 5-light F1 start gantry — more lights lit as the race approaches. */
  get litCount(): number {
    if (!this.countdown) {
      return 0;
    }
    const totalSeconds = this.countdown.days * 86400 + this.countdown.hours * 3600
      + this.countdown.minutes * 60 + this.countdown.seconds;
    if (totalSeconds > 7 * 86400) return 1;
    if (totalSeconds > 3 * 86400) return 2;
    if (totalSeconds > 86400) return 3;
    if (totalSeconds > 3600) return 4;
    return 5;
  }
}
