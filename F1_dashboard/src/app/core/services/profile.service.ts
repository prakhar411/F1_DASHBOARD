import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Profile {
  fullName: string;
  username: string;
  email: string;
  newToF1: boolean;
  favoriteTeam: string | null;
  favoriteDriver: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getMe(): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiUrl}/profile/me`);
  }

  updateFavorites(favorites: { favoriteTeam?: string; favoriteDriver?: string }): Observable<Profile> {
    return this.http.patch<Profile>(`${environment.apiUrl}/profile/favorites`, favorites);
  }
}
