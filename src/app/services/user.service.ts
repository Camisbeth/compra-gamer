import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../types/userType';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsers() {
    const users = localStorage.getItem('users');

    if (!users) return;

    return JSON.parse(users);
  }

  getUser() {
    const user = localStorage.getItem('loggedUser');

    if (!user) return;

    return JSON.parse(user);
  }

  createUser(newUser: User): Observable<any> {
    const savedUsers = localStorage.getItem('users');
    let users: User[] = [];

    if (savedUsers) {
      users = JSON.parse(savedUsers);
    }

    users.push(newUser);
    this.fakeLogin(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    return of(newUser).pipe(delay(1000));
  }

  fakeLogin(user: User) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('loggedUser');
  }

  getExistingUsers() {
    const users = localStorage.getItem('users');

    if (!users) return [];

    return JSON.parse(users);
  }
}
