import type { Route } from "./+types/listproducts";
import { ListProductsPage } from "../../../src/pages/admin/ListProducts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Admin - Lista de produtos" },
    {
      name: "description",
      content: "Área administrativa para listar produtos.",
    },
  ];
}

export default function AdminListProducts() {
  return <ListProductsPage />;
}
