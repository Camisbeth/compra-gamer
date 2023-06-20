import { Injectable } from '@angular/core';

import { Product } from '../types/productType';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  getCart() {
    return localStorage.getItem('cart');
  }

  getParsedCart() {
    const cart = this.getCart();
    if (!cart) return [];

    return JSON.parse(cart);
  }

  setCart(products: Product[]) {
    return localStorage.setItem('cart', JSON.stringify(products));
  }

  updateCart() {
    window.dispatchEvent(new Event('storage'));

    const cart = this.getCart();

    if (!cart) return;

    return JSON.parse(cart);
  }

  removeProduct(product: Product) {
    const localStorageCart = this.getCart();
    if (!localStorageCart) return;

    const parsedCart = JSON.parse(localStorageCart);

    const idx = parsedCart.findIndex(
      (p: Product) => p.id_producto === product.id_producto
    );

    if (idx === -1) return;

    parsedCart.splice(idx, 1);

    this.setCart(parsedCart);
    this.updateCart();
  }

  addItemToCart(product: Product) {
    const oldCart = this.getCart();

    let oldProducts = [];

    if (oldCart) {
      oldProducts = JSON.parse(oldCart);
    }

    this.setCart([...oldProducts, product]);
    this.updateCart();
  }
}
