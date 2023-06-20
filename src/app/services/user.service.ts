import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
