import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  fullName: string;
}

export interface RegisterRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
  newToF1: boolean;
  favoriteTeam: string | null;
  favoriteDriver: string | null;
}

export interface MessageResponse {
  message: string;
}

export interface UsernameAvailability {
  available: boolean;
}

const TOKEN_KEY = 'pitwall_token';
const NAME_KEY = 'pitwall_user_name';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserNameSubject = new BehaviorSubject<string | null>(localStorage.getItem(NAME_KEY));
  currentUserName$ = this.currentUserNameSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, request)
      .pipe(tap(res => this.setSession(res)));
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, request)
      .pipe(tap(res => this.setSession(res)));
  }

  checkUsernameAvailable(username: string): Observable<UsernameAvailability> {
    return this.http.get<UsernameAvailability>(`${environment.apiUrl}/auth/username-available`, {
      params: { username }
    });
  }

  verifyOtp(email: string, otp: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/verify-otp`, { email, otp })
      .pipe(tap(res => this.setSession(res)));
  }

  resendOtp(email: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${environment.apiUrl}/auth/resend-otp`, { email });
  }

  setSession(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(NAME_KEY, res.fullName);
    this.currentUserNameSubject.next(res.fullName);
  }

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME_KEY);
    this.currentUserNameSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
}
