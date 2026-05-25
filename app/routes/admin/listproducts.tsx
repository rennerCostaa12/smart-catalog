import type { Route } from "./+types/listproducts";
import { AdminPage } from "../../../src/pages/admin";

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
  return (
    <AdminPage
      title="Lista de produtos"
      description="Visualize e acompanhe os produtos cadastrados no catálogo."
    />
  );
}
