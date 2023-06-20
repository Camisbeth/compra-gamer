import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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

  saveUser(user: Record<string, string | number>): Observable<any> {
    const savedUsers = localStorage.getItem('users');
    let users: Record<string, string | number>[] = [];

    if (savedUsers) {
      users = JSON.parse(savedUsers);
    }
    users.push(user);
    localStorage.setItem('user', JSON.stringify(user));

    return of(user).pipe(delay(1000));
  }
}
