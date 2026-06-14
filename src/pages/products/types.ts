export type ProductFilter =
  | "Todos"
  | "Eletrônicos"
  | "Acessórios"
  | "Casa"
  | "Escritório";

export enum CategoryEnum {
  ALL = "todos",
  ELETRONIC = "eletronicos",
  ACCESSORY = "acessorios",
  HOME = "casa",
  ESCRITÓRIO = "escritorio",
}

export type ProductCategory = Exclude<ProductFilter, "Todos">;
