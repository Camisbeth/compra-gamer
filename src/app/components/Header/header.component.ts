import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/types/productType';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/userType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CurrencyPipe],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    currencyPipe: CurrencyPipe,
    private userService: UserService
  ) {
    this.currencyPipe = currencyPipe;
  }

  isModalOpen: boolean = false;
  cartItems: Product[] = [];
  currencyPipe: CurrencyPipe;
  loggedUser: User | undefined = undefined;
  isRegisterOpen: boolean = false;

  handleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  getIVAPrice(products: any) {
    const { precio, iva } = products;
    return precio + (precio * iva) / 100;
  }

  addToCart() {
    // const products = {
    //   id: '',
    //   name: '',
    //   price: 10.99,
    //   Otros detalles del producto
    // };
    // const url = 'https://static.compragamer.com/test/productos.json';
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // this.http.post(url, products, { headers }).subscribe(
    //   () => {
    //     this.snackBar.open('El producto se ha añadido al carrito', 'Cerrar', {
    //       duration: 2000
    //     });
    //   },
    //   (error) => {
    //     console.error('Error al añadir al desplegar el carrito:', error);
    //     this.snackBar.open('Error al añadir al desplegar el carrito', 'Cerrar', {
    //       duration: 3000
    //     });
    //   }
    // );
  }

  ngOnInit(): void {
    if (localStorage.getItem('cart') != null) {
      this.cartItems = JSON.parse(localStorage.getItem('cart')!);
    }

    if (localStorage.getItem('loggedUsesr') != null) {
      this.loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);
    }

    window.addEventListener('storage', this.updateCart);

    window.addEventListener('login', () => {
      const bla = this.userService.getUser();
      console.log(bla);
      this.loggedUser = bla;
    });

    this.getUserData();
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.updateCart);

    window.removeEventListener('login', () => {
      const bla = this.userService.getUser();
      console.log(bla);
      this.loggedUser = bla;
    });
  }

  goToCart() {
    this.router.navigate(['/carrito']);
  }

  getUserData() {
    this.loggedUser = this.userService.getUser();
  }

  logout() {
    this.loggedUser = this.userService.logout();
  }

  handleRegister() {
    this.isRegisterOpen = !this.isRegisterOpen;
  }

  private updateCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    if (localStorageCart) {
      this.cartItems = JSON.parse(localStorageCart);
      console.log(this.cartItems);
    }
  };
}
