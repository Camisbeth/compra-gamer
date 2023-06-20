import { Image } from './imageType';

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
};
