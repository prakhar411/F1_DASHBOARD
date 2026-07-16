import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService, Race } from '../../core/services/calendar.service';
import { TrackDetailModalComponent } from '../../shared/track-detail-modal/track-detail-modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  races: Race[] = [];
  loading = true;
  nextRound: number | null = null;

  constructor(private calendarService: CalendarService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.calendarService.getCalendar().subscribe(data => {
      this.races = data;
      this.loading = false;
    });
    this.calendarService.getNextRace().subscribe({
      next: race => this.nextRound = race ? race.round : null,
      error: () => this.nextRound = null
    });
  }

  isPast(race: Race): boolean {
    return new Date(race.raceDateTimeUtc).getTime() < Date.now();
  }

  openTrack(race: Race): void {
    const ref = this.modalService.open(TrackDetailModalComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'driver-modal'
    });
    ref.componentInstance.circuitId = race.circuitId;
    ref.componentInstance.circuitName = race.circuitName;
    ref.componentInstance.locality = race.locality;
    ref.componentInstance.country = race.country;
    ref.componentInstance.raceName = race.raceName;
  }
}
