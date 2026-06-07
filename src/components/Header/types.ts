export interface IHeaderProps {
  onOpenMenu?: () => void;
  onSettings?: () => void;
}

export interface IMenuUserProps {
  username?: string;
  logout: () => void;
  onSettings?: () => void;
}
