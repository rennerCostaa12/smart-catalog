import type { Route } from "./+types/products";
import { Outlet } from "react-router";

import { LayoutProduct } from "../../src/components/LayoutProduct";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Produtos" },
    { name: "description", content: "Produtos" },
  ];
}

export default function Products() {
  return (
    <LayoutProduct>
      <Outlet />
    </LayoutProduct>
  );
}
