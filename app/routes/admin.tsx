import type { Route } from "./+types/admin";
import { AdminPage } from "../../src/pages/admin";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Admin" },
    { name: "description", content: "Área de administração smart catalog." },
  ];
}

export default function Admin() {
  return <AdminPage />;
}
