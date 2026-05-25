import type { Route } from "./+types/products";
import { AdminPage } from "../../../src/pages/admin";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Admin - Produtos" },
    {
      name: "description",
      content: "Área administrativa para cadastro e edição de produtos.",
    },
  ];
}

export default function AdminProducts() {
  return (
    <AdminPage
      title="Produtos"
      description="Cadastre, edite e organize os produtos disponíveis."
    />
  );
}
