import type { IMenuItemProps } from "../SideMenu/components/MenuItem/types";

export interface IMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (data: boolean) => void;
  menuItems: IMenuItemProps[];
}
