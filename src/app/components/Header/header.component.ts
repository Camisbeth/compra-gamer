import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from 'src/app/types/productType';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [],
})
export class HeaderComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  isModalOpen: boolean = false;
  cartItems: Product[] = [];

  handleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  getIVAPrice(products: any) {
    const { precio, iva } = products;
    return precio + (precio * iva) / 100;
  }

  ngOnInit(): void {
    if (localStorage.getItem('cart') != null) {
      this.cartItems = JSON.parse(localStorage.getItem('cart')!);
    }

    window.addEventListener('storage', () => {
      const newList = this.cartService.getParsedCart();
      this.cartItems = newList;
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', () => {
      const newList = this.cartService.getParsedCart();
      this.cartItems = newList;
    });
  }

  removeProductFromCart(product: Product) {
    this.cartService.removeProduct(product);
  }

  formatPrice(product: Product) {
    return this.productService.priceWithIVA(product.precio, product.iva);
  }
}
