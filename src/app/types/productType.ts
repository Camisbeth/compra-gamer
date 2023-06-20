import { Image } from './imageType';
import { Subcategory } from './subcategoryType';

export type Product = {
  destacado: number;
  nombre: string;
  id_producto: number;
  id_subcategoria: number;
  precio: number;
  imagenes: Image[];
  vendible: number;
  stock: number;
  garantia: number;
  iva: number;
  subcategoria?: Subcategory;
};
