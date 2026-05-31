import { LayoutGrid, Phone, ShoppingCart } from "lucide-react";
import type { IMenuItemProps } from "../SideMenu/components/MenuItem/types";

const menuItemsProducts: IMenuItemProps[] = [
  {
    label: "Catalogo",
    href: "listar-produtos",
    icon: LayoutGrid,
  },
  {
    label: "Carrinhos",
    href: "carrinhos",
    icon: ShoppingCart,
  },
  {
    label: "Contato",
    href: "contato",
    icon: Phone,
  },
];

export { menuItemsProducts };
