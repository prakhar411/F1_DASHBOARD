import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDetailModalComponent } from './track-detail-modal.component';

describe('TrackDetailModalComponent', () => {
  let component: TrackDetailModalComponent;
  let fixture: ComponentFixture<TrackDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackDetailModalComponent]
    });
    fixture = TestBed.createComponent(TrackDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
