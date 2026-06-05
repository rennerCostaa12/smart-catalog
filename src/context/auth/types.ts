import type { ReactNode } from "react";

export type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onAuthenticate: (data: AuthLoginData) => void;
  onOpenRegister: () => void;
};

export type RegisterUserModalProps = {
  open: boolean;
  onClose: () => void;
  onRegister: (user: AuthRegisterData) => void;
};

export type AuthUser = {
  name?: string;
  email: string;
  phone?: string;
};

export type AuthLoginData = {
  email: string;
};

export type AuthRegisterData = {
  name: string;
  email: string;
  phone: string;
};

export type AuthContextData = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authenticate: (data: AuthLoginData | AuthRegisterData) => void;
  logout: () => void;
  requestAuthentication: (onAuthenticated?: () => void) => void;
  closeAuthModal: () => void;
};

export type AuthProviderProps = {
  children: ReactNode;
};
