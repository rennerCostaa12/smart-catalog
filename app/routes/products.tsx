import type { Route } from "./+types/products";
import { Outlet } from "react-router";

import { Layout } from "../../src/components/Layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Produtos" },
    { name: "description", content: "Produtos" },
  ];
}

export default function Products() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
