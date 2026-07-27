export type ProductFilter =
  | "Todos"
  | "Eletrônicos"
  | "Acessórios"
  | "Casa"
  | "Escritório";

export enum CategoryEnum {
  ALL = "todos",
  ELETRONIC = "eletrônicos",
  ACCESSORY = "acessórios",
  HOME = "casa",
  DESK = "escritório",
}

export type ProductCategory = Exclude<ProductFilter, "Todos">;
