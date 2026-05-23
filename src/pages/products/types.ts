export type ProductFilter =
  | "Todos"
  | "Eletronicos"
  | "Acessorios"
  | "Casa"
  | "Escritorio"
  | "Promocoes";

export type ProductCategory = Exclude<ProductFilter, "Todos">;

export interface IProductsMockProps {
  url_img: string;
  title: string;
  price: number;
  category: ProductCategory;
}
