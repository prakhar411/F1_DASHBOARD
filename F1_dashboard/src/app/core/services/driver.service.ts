import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Driver {
  driverId: string;
  code: string | null;
  permanentNumber: number | null;
  givenName: string;
  familyName: string;
  dateOfBirth: string | null;
  nationality: string | null;
  constructorId: string | null;
  constructorName: string | null;
  current: boolean;
}

export interface TeamStint {
  constructorId: string | null;
  name: string;
  fromSeason: number;
  toSeason: number;
}

export interface DriverLastRace {
  raceName: string;
  round: number;
  position: number | null;
  points: number | null;
  fastestLapTime: string | null;
}

export interface DriverDetail {
  driverId: string;
  code: string | null;
  permanentNumber: number | null;
  givenName: string;
  familyName: string;
  nationality: string | null;
  dateOfBirth: string | null;
  constructorId: string | null;
  constructorName: string | null;
  standingPosition: number | null;
  standingPoints: number | null;
  seasonWins: number | null;
  seasonBestLapTime: string | null;
  careerWins: number | null;
  careerPodiums: number | null;
  championships: number | null;
  careerPoints: number | null;
  seasonsCount: number | null;
  firstSeason: number | null;
  currentTeamSince: number | null;
  previousTeams: TeamStint[];
  lastRace: DriverLastRace | null;
}

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.apiUrl}/drivers`);
  }

  getDriverDetail(driverId: string): Observable<DriverDetail> {
    return this.http.get<DriverDetail>(`${environment.apiUrl}/drivers/${driverId}/detail`);
  }
}
