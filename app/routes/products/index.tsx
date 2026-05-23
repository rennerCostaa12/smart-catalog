import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Produtos" },
    { name: "description", content: "Produtos" },
  ];
}

export default function ProductsIndex() {
  return <h1>PRODUTOS</h1>
}
