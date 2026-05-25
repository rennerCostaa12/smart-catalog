export interface IUserProps {
  name: string;
  avatarSrc?: string;
  onSettings?: () => void;
  onLogout?: () => void;
  className?: string;
}

export interface IUseUserProps {
  onSettings?: () => void;
  onLogout?: () => void;
}
