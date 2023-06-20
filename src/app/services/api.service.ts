import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://static.compragamer.com/test'; // URL base de la API

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}.json`;
    return this.http.get<T>(url);
  }
}
