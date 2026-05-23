import type { Route } from "./+types/products";
import { ProductsPage } from "../../src/pages/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Produtos" },
    { name: "description", content: "Produtos" },
  ];
}

export default function Products() {
  return <ProductsPage />;
}
