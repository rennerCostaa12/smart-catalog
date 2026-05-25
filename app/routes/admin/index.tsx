import { Navigate } from "react-router";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Admin" },
    { name: "description", content: "Área de administração smart catalog." },
  ];
}

export default function AdminIndex() {
  return <Navigate to="/admin/lista-produtos" replace />;
}
