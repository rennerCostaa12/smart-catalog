export interface IUserMenuOption {
  name: string;
  url: string;
}

export interface IUserMenuProps {
  options: IUserMenuOption[];
  className?: string;
}
