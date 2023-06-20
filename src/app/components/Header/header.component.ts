import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/types/productType';

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
    currencyPipe: CurrencyPipe
  ) {
    this.currencyPipe = currencyPipe;
  }

  isModalOpen: boolean = false;
  cartItems: Product[] = [];
  currencyPipe: CurrencyPipe;

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
    window.addEventListener('storage', this.updateCart);
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.updateCart);
  }

  goToCart() {
    this.router.navigate(['/carrito']);
  }

  private updateCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    if (localStorageCart) {
      this.cartItems = JSON.parse(localStorageCart);
      console.log(this.cartItems);
    }
  };
}
