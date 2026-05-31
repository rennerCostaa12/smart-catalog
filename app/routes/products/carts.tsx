import type { Route } from "./+types/carts";
import { CartsPage } from "../../../src/pages/products/Carts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Carrinhos" },
    { name: "description", content: "Carrinhos" },
  ];
}

export default function Carts() {
  return <CartsPage />;
}
