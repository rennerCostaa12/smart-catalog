import type { IUserMenuOption } from "../User/components/UserMenu/types";

export interface IHeaderProps {
  onOpenMenu?: () => void;
  onSettings?: () => void;
}

export interface IMenuUserProps {
  username?: string;
  options: IUserMenuOption[];
}
