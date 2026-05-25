import { LayoutGrid, Phone } from "lucide-react";
import type { IMenuItemProps } from "../SideMenu/components/MenuItem/types";

const menuItemsProducts: IMenuItemProps[] = [
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

export { menuItemsProducts };