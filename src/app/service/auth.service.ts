import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://medicalstore.mashupstack.com/api';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.tokenKey, response.token);
          }
        })
      );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenKey) !== null;
    } else {
      return false;
    }
  }

  getToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(this.tokenKey) : null;
  }
}
