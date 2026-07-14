import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Team {
  constructorId: string;
  name: string;
  nationality: string | null;
}

export interface TeamDriver {
  driverId: string;
  code: string | null;
  permanentNumber: number | null;
  givenName: string;
  familyName: string;
  position: number | null;
  points: number | null;
  wins: number | null;
}

export interface TeamDetail {
  constructorId: string;
  name: string;
  nationality: string | null;
  position: number | null;
  points: number | null;
  wins: number | null;
  drivers: TeamDriver[];
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.apiUrl}/teams`);
  }

  getTeamDetail(constructorId: string): Observable<TeamDetail> {
    return this.http.get<TeamDetail>(`${environment.apiUrl}/teams/${constructorId}/detail`);
  }
}
