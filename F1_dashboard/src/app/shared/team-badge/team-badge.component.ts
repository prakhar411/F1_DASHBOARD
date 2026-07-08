import { Component, Input } from '@angular/core';
import { teamColor } from '../../core/constants/team-colors';
import { teamLogo } from '../../core/constants/team-logos';

@Component({
  selector: 'app-team-badge',
  templateUrl: './team-badge.component.html',
  styleUrls: ['./team-badge.component.css']
})
export class TeamBadgeComponent {
  @Input() constructorId: string | null = null;
  @Input() name = '';
  @Input() size = 32;

  get logoUrl(): string | null {
    return teamLogo(this.constructorId);
  }

  get color(): string {
    return teamColor(this.constructorId);
  }

  get initials(): string {
    return this.name
      .split(' ')
      .filter(Boolean)
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
}
