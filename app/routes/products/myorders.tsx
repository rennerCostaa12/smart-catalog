import type { Route } from "./+types/myorders";

import { MyOrdersPage } from "../../../src/pages/products/MyOrders";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Meus pedidos" },
    { name: "description", content: "Acompanhe seus pedidos" },
  ];
}

export default function MyOrders() {
  return <MyOrdersPage />;
}
