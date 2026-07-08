import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DriverStanding {
  position: number;
  points: number;
  wins: number;
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
  nationality: string;
  constructorId: string;
  constructorName: string;
  seasonBestLapTime: string | null;
}

export interface ConstructorStanding {
  position: number;
  points: number;
  wins: number;
  constructorId: string;
  name: string;
  nationality: string;
}

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(private http: HttpClient) { }

  getDriverStandings(): Observable<DriverStanding[]> {
    return this.http.get<DriverStanding[]>(`${environment.apiUrl}/standings/drivers`);
  }

  getConstructorStandings(): Observable<ConstructorStanding[]> {
    return this.http.get<ConstructorStanding[]>(`${environment.apiUrl}/standings/constructors`);
  }
}
