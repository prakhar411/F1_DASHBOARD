import { Component, Input } from '@angular/core';
import { teamColor } from '../../core/constants/team-colors';
import { driverPhoto } from '../../core/constants/driver-photos';

@Component({
  selector: 'app-driver-avatar',
  templateUrl: './driver-avatar.component.html',
  styleUrls: ['./driver-avatar.component.css']
})
export class DriverAvatarComponent {
  @Input() driverId: string | null = null;
  @Input() givenName = '';
  @Input() familyName = '';
  @Input() constructorId: string | null = null;
  @Input() size = 48;

  get photoUrl(): string | null {
    return driverPhoto(this.driverId);
  }

  get color(): string {
    return teamColor(this.constructorId);
  }

  get initials(): string {
    return `${this.givenName.charAt(0)}${this.familyName.charAt(0)}`.toUpperCase();
  }
}
