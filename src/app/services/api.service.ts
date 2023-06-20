import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  BASE_URL = 'https://static.compragamer.com/test/';

  getSubcategories(): Observable<any> {
    const url = `${this.BASE_URL}subcategorias.json`;
    return this.http.get(url);
  }
  getProducts(): Observable<any> {
    const url = `${this.BASE_URL}productos.json`;
    return this.http.get(url);
  }
  getImage(productName: string, imageName: string): Observable<any> {
    const url = `https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_${imageName}-med.jpg`;
    const image = [productName, url];
    return of(image);
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
