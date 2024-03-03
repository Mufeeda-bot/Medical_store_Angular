import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private apiUrl = 'https://medicalstore.mashupstack.com/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let authToken = '';
    if (typeof localStorage !== 'undefined') {
      authToken = localStorage.getItem('auth_token') || '';
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
  }
  
  addMedicine(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medicine`, data, { headers: this.getHeaders() });
  }

  updateMedicine(id: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medicine/${id}`, data, { headers: this.getHeaders() });
  }

  getMedicine(): Observable<any> {
    return this.http.get(`${this.apiUrl}/medicine`, { headers: this.getHeaders() });
  }

  deleteMedicine(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/medicine/${id}`, { headers: this.getHeaders() });
  }
}
