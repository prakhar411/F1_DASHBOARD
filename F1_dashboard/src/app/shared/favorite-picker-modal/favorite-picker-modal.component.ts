import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Team, TeamService } from '../../core/services/team.service';
import { Driver, DriverService } from '../../core/services/driver.service';
import { Profile, ProfileService } from '../../core/services/profile.service';
import { teamColor } from '../../core/constants/team-colors';
import { driverPhoto } from '../../core/constants/driver-photos';
import { teamDisplayName } from '../../core/constants/team-display-names';

/**
 * Overlay for picking a favorite team or driver.
 * Closes with the updated Profile on save, dismisses on cancel.
 */
@Component({
  selector: 'app-favorite-picker-modal',
  templateUrl: './favorite-picker-modal.component.html',
  styleUrls: ['./favorite-picker-modal.component.css']
})
export class FavoritePickerModalComponent implements OnInit {

  @Input() mode: 'team' | 'driver' = 'team';
  /** Currently saved favorite (display name), to pre-highlight it. */
  @Input() current: string | null = null;

  teams: Team[] = [];
  drivers: Driver[] = [];
  loading = true;
  saving = false;
  saveFailed = false;

  selectedName: string | null = null;

  teamColor = teamColor;
  driverPhoto = driverPhoto;
  teamDisplayName = teamDisplayName;

  constructor(
    public activeModal: NgbActiveModal,
    private teamService: TeamService,
    private driverService: DriverService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.selectedName = this.current;
    if (this.mode === 'team') {
      this.teamService.getTeams().subscribe({
        next: (teams) => { this.teams = teams; this.loading = false; },
        error: () => this.loading = false
      });
    } else {
      this.driverService.getDrivers().subscribe({
        next: (drivers) => { this.drivers = drivers.filter(d => d.current); this.loading = false; },
        error: () => this.loading = false
      });
    }
  }

  select(name: string): void {
    this.selectedName = this.selectedName === name ? null : name;
  }

  confirm(): void {
    if (!this.selectedName || this.saving) {
      return;
    }
    this.saving = true;
    this.saveFailed = false;
    const payload = this.mode === 'team'
      ? { favoriteTeam: this.selectedName }
      : { favoriteDriver: this.selectedName };
    this.profileService.updateFavorites(payload).subscribe({
      next: (profile: Profile) => this.activeModal.close(profile),
      error: () => { this.saving = false; this.saveFailed = true; }
    });
  }
}
