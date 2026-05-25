import type { IMenuItemProps } from "./components/MenuItem/types";

export interface ISideMenuProps {
  className?: string;
  onNavigate?: () => void;
  menuItems: IMenuItemProps[];
  pathname?: string;
}
