import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Product } from 'src/app/types/productType';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/userType';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [],
})
export class HeaderComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private cartService: CartService,
    private productService: ProductService,
    private registerService: RegisterService
  ) {}

  isModalOpen: boolean = false;
  cartItems: Product[] = [];
  loggedUser: User | undefined = undefined;

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

    window.addEventListener('login', () => {
      this.loggedUser = this.userService.getUser();
    });

    if (localStorage.getItem('loggedUser') != null) {
      this.loggedUser = this.userService.getUser();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', () => {
      const newList = this.cartService.getParsedCart();
      this.cartItems = newList;
    });

    window.removeEventListener('login', () => {
      this.loggedUser = this.userService.getUser();
    });

    window.addEventListener('storage', () => {
      const newList = this.cartService.getParsedCart();
      this.cartItems = newList;
    });
  }

  removeProductFromCart(product: Product) {
    this.cartService.removeProduct(product);
  }

  getUserData() {
    this.loggedUser = this.userService.getUser();
  }

  logout() {
    this.loggedUser = this.userService.logout();
  }

  get isRegisterOpen(): boolean {
    return this.registerService.getRegisterStatus();
  }

  handleRegister() {
    this.registerService.handleRegister();
  }

  formatPrice(product: Product) {
    return this.productService.priceWithIVA(product.precio, product.iva);
  }
}
