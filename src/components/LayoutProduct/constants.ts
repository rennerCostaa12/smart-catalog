import { LayoutGrid, Phone, ShoppingCart } from "lucide-react";
import { ROUTE_SEGMENTS } from "../../../app/constants";
import type { IMenuItemProps } from "../SideMenu/components/MenuItem/types";

const menuItemsProducts: IMenuItemProps[] = [
  {
    label: "Catalogo",
    href: ROUTE_SEGMENTS.products.listProducts,
    icon: LayoutGrid,
  },
  {
    label: "Carrinhos",
    href: ROUTE_SEGMENTS.products.carts,
    icon: ShoppingCart,
  },
  {
    label: "Contato",
    href: ROUTE_SEGMENTS.products.contact,
    icon: Phone,
  },
];

export { menuItemsProducts };
