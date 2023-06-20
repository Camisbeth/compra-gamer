import { Injectable } from '@angular/core';

import { Product } from '../types/productType';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  priceWithIVA(amount: Product['precio'], iva: Product['iva']) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format((amount * iva) / 100 + amount);
  }
}
