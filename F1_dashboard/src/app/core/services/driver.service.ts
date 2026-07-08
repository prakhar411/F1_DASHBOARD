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
}

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.apiUrl}/drivers`);
  }
}
