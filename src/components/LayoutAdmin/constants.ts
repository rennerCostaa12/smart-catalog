import { LayoutGrid, Box, Settings } from "lucide-react";
import { ROUTE_SEGMENTS } from "../../../app/constants";
import type { IMenuItemProps } from "../SideMenu/components/MenuItem/types";

const menuItemsAdmin: IMenuItemProps[] = [
  {
    label: "Lista de produtos",
    href: ROUTE_SEGMENTS.admin.listProducts,
    icon: LayoutGrid,
  },
  {
    label: "Produtos",
    href: ROUTE_SEGMENTS.admin.products,
    icon: Box,
  },
  {
    label: "Configurações",
    href: ROUTE_SEGMENTS.admin.settings,
    icon: Settings,
  },
];

export { menuItemsAdmin };
