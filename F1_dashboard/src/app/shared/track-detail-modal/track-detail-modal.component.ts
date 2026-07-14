import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { circuitDetail, CircuitDetail } from '../../core/constants/circuit-details';
import { circuitImage } from '../../core/constants/circuit-images';
import { CalendarService, CircuitWinner } from '../../core/services/calendar.service';

@Component({
  selector: 'app-track-detail-modal',
  templateUrl: './track-detail-modal.component.html',
  styleUrls: ['./track-detail-modal.component.css']
})
export class TrackDetailModalComponent implements OnInit {
  @Input() circuitId!: string;
  @Input() circuitName = '';
  @Input() locality = '';
  @Input() country = '';
  @Input() raceName = '';

  lastWinner: CircuitWinner | null = null;

  constructor(public activeModal: NgbActiveModal, private calendarService: CalendarService) { }

  ngOnInit(): void {
    if (this.circuitId) {
      this.calendarService.getCircuitLastWinner(this.circuitId).subscribe({
        next: (winner) => this.lastWinner = winner ?? null,
        error: () => this.lastWinner = null
      });
    }
  }

  get image(): string | null {
    return circuitImage(this.circuitId);
  }

  get detail(): CircuitDetail | null {
    return circuitDetail(this.circuitId);
  }

  get raceDistanceKm(): string | null {
    if (!this.detail) {
      return null;
    }
    return (this.detail.lengthKm * this.detail.laps).toFixed(1);
  }
}
