import type { Route } from "./+types/admin";
import { LayoutAdmin } from "../../src/components/LayoutAdmin";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Catalog - Admin" },
    { name: "description", content: "Área de administração smart catalog." },
  ];
}

export default function Admin() {
  return (
    <LayoutAdmin>
      <Outlet />
    </LayoutAdmin>
  );
}
