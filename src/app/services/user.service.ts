import { Injectable } from '@angular/core';
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

  createUser(newUser: User) {
    const savedUsers = localStorage.getItem('users');
    let users: User[] = [];

    if (savedUsers) {
      users = JSON.parse(savedUsers);
    }

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    this.fakeLogin(newUser);

    return newUser;
  }

  fakeLogin(user: User) {
    window.dispatchEvent(new Event('login'));
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  logout() {
    window.dispatchEvent(new Event('login'));
    localStorage.removeItem('loggedUser');

    return this.getUser();
  }

  getExistingUsers() {
    const users = localStorage.getItem('users');

    if (!users) return [];

    return JSON.parse(users);
  }
}
