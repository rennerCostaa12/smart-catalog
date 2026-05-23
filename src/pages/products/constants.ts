import type { IProductsMockProps, ProductFilter } from "./types";

export const productFilters: ProductFilter[] = [
  "Todos",
  "Eletronicos",
  "Acessorios",
  "Casa",
  "Escritorio",
];

export const productsMock: IProductsMockProps[] = [
  {
    url_img:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    title: "Smartphone Pro Max 256GB",
    price: 4299.9,
    category: "Eletronicos",
  },
  {
    url_img:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    title: "Fone Bluetooth com Cancelamento de Ruido",
    price: 799.9,
    category: "Acessorios",
  },
  {
    url_img:
      "https://images.unsplash.com/photo-1585386959984-a41552231658?auto=format&fit=crop&w=900&q=80",
    title: "Cadeira Ergonomica para Escritorio",
    price: 1249.9,
    category: "Escritorio",
  },
  {
    url_img:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    title: "Luminaria Minimalista de Mesa",
    price: 189.9,
    category: "Casa",
  },
  {
    url_img:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
    title: "Notebook Ultra Slim 14 Polegadas",
    price: 5199.9,
    category: "Eletronicos",
  },
];
