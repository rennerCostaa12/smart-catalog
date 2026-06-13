import type { IUserMenuOption } from "./components/UserMenu/types";

export interface IUserProps {
  name: string;
  avatarSrc?: string;
  options?: IUserMenuOption[];
  className?: string;
}

export type IUseUserProps = {
  options: IUserMenuOption[];
};
