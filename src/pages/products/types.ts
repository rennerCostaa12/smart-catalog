export type ProductFilter =
  | "Todos"
  | "Eletronicos"
  | "Acessorios"
  | "Casa"
  | "Escritorio";

export enum CategoryEnum {
  ALL = "todos",
  ELETRONIC = "eletronicos",
  ACCESSORY = "acessorios",
  HOME = "casa",
  ESCRITÓRIO = "escritorio",
}

export type ProductCategory = Exclude<ProductFilter, "Todos">;

export interface IProductsMockProps {
  url_img: string;
  title: string;
  price: number;
  category: ProductCategory;
}
