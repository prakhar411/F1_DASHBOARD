import { Pipe, PipeTransform } from '@angular/core';
import { teamDisplayName } from '../../core/constants/team-display-names';

@Pipe({
  name: 'teamName'
})
export class TeamNamePipe implements PipeTransform {

  transform(fallbackName: string, constructorId: string | null | undefined): string {
    return teamDisplayName(constructorId, fallbackName);
  }

}
