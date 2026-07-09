import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { circuitDetail, CircuitDetail } from '../../core/constants/circuit-details';
import { circuitImage } from '../../core/constants/circuit-images';

@Component({
  selector: 'app-track-detail-modal',
  templateUrl: './track-detail-modal.component.html',
  styleUrls: ['./track-detail-modal.component.css']
})
export class TrackDetailModalComponent {
  @Input() circuitId!: string;
  @Input() circuitName = '';
  @Input() locality = '';
  @Input() country = '';
  @Input() raceName = '';

  constructor(public activeModal: NgbActiveModal) { }

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
