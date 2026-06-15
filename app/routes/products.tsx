import type { Route } from "./+types/products";
import { Outlet } from "react-router";

import { LayoutProduct } from "../../src/components/LayoutProduct";
import { CatalogClientProvider } from "../../src/context/catalogClient";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Produtos" },
    { name: "description", content: "Produtos" },
  ];
}

export default function Products() {
  return (
    <CatalogClientProvider>
      <LayoutProduct>
        <Outlet />
      </LayoutProduct>
    </CatalogClientProvider>
  );
}
