import type { Route } from "../+types/products";

import { ListProductsPage } from "../../../src/pages/products/ListProducts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Listagem de Produtos" },
    { name: "description", content: "Produtos" },
  ];
}

export default function ListProducts() {
  return <ListProductsPage />
}
