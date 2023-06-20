import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/productType';
import { Subcategory } from 'src/app/types/subcategoryType';

@Component({
  selector: 'app-product-list',
  templateUrl: './productsList.component.html',
  styleUrls: ['./productsList.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  subcategories: Subcategory[] = [];

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchSubcategories();
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      this.apiService.get('productos').subscribe((p) => {
        const withSubcategories = (p as Product[]).map((product) => {
          return {
            ...product,
            subcategoria: this.subcategories.find(
              (subcategory) => subcategory.id === product.id_subcategoria
            ),
          };
        });

        this.products = withSubcategories;
      });
    } catch (err) {
      console.log(err);
    }
  }

  async fetchSubcategories() {
    try {
      this.apiService.get('subcategorias').subscribe((s) => {
        this.subcategories = s as Subcategory[];
      });
    } catch (err) {
      console.log(err);
    }
  }

  addToCart(product: Product) {
    this.cartService.addItemToCart(product);
  }

  formatPrice(product: Product) {
    return this.productService.priceWithIVA(product.precio, product.iva);
  }
}
