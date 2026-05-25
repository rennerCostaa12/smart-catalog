import { LayoutGrid, Box, Settings } from "lucide-react";
import type { IMenuItemProps } from "../SideMenu/components/MenuItem/types";

const menuItemsAdmin: IMenuItemProps[] = [
  {
    label: "Catalogo",
    href: "listar-produtos",
    icon: LayoutGrid,
  },
  {
    label: "Produtos",
    href: "produtos",
    icon: Box,
  },
  {
    label: "Configurações",
    href: "configuracoes",
    icon: Settings,
  },
];

export { menuItemsAdmin };
