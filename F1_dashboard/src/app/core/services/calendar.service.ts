import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Race {
  season: number;
  round: number;
  raceName: string;
  circuitId: string | null;
  circuitName: string;
  locality: string;
  country: string;
  raceDate: string;
  raceTime: string | null;
  raceDateTimeUtc: string;
  winnerDriverId: string | null;
  winnerName: string | null;
  lastYearWinnerName: string | null;
  lastYearSeason: number | null;
}

export interface PodiumFinisher {
  position: number;
  driverId: string;
  givenName: string;
  familyName: string;
  code: string;
  constructorId: string;
  constructorName: string;
  bestLapTime: string | null;
}

export interface LastRaceRecap {
  season: number;
  round: number;
  raceName: string;
  podium: PodiumFinisher[];
}

export interface CircuitWinner {
  season: number;
  raceName: string;
  driverId: string;
  driverName: string;
  constructorName: string | null;
  fastestLapTime: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getCalendar(): Observable<Race[]> {
    return this.http.get<Race[]>(`${environment.apiUrl}/calendar`);
  }

  getNextRace(): Observable<Race> {
    return this.http.get<Race>(`${environment.apiUrl}/calendar/next`);
  }

  getLastRaceRecap(): Observable<LastRaceRecap> {
    return this.http.get<LastRaceRecap>(`${environment.apiUrl}/calendar/last-result`);
  }

  getCircuitLastWinner(circuitId: string): Observable<CircuitWinner> {
    return this.http.get<CircuitWinner>(`${environment.apiUrl}/circuits/${circuitId}/last-winner`);
  }
}
