import { Component, OnInit } from '@angular/core';
import { CalendarService, Race } from '../../core/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  races: Race[] = [];
  loading = true;
  nextRound: number | null = null;

  constructor(private calendarService: CalendarService) { }

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
}
