import type { Route } from "./+types/settings";
import { AdminPage } from "../../../src/pages/admin";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Admin - Configurações" },
    {
      name: "description",
      content: "Área administrativa para configurações da plataforma.",
    },
  ];
}

export default function AdminSettings() {
  return (
    <AdminPage
      title="Configurações"
      description="Ajuste preferências e parâmetros da área administrativa."
    />
  );
}
