import { LayoutGrid, Phone } from "lucide-react";
import type { IMenuItemProps } from "./components/MenuItem/types";

const menuItems: IMenuItemProps[] = [
  {
    label: "Catalogo",
    href: "listar-produtos",
    icon: LayoutGrid,
  },
  {
    label: "Contato",
    href: "contato",
    icon: Phone,
  },
];

export { menuItems };
