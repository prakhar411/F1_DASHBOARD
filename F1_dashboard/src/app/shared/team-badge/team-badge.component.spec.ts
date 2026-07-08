import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBadgeComponent } from './team-badge.component';

describe('TeamBadgeComponent', () => {
  let component: TeamBadgeComponent;
  let fixture: ComponentFixture<TeamBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamBadgeComponent]
    });
    fixture = TestBed.createComponent(TeamBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
