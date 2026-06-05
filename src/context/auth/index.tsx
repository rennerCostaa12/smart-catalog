import { createContext, useState } from "react";

import { AuthModal } from "./components/AuthModal";
import { RegisterUserModal } from "./components/RegisterUserModal";
import type {
  AuthContextData,
  AuthLoginData,
  AuthProviderProps,
  AuthRegisterData,
  AuthUser,
} from "./types";

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterUserModalOpen, setIsRegisterUserModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    (() => void) | undefined
  >();

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setIsRegisterUserModalOpen(false);
    setPendingAction(undefined);
  };

  const completeAuthentication = (authenticatedUser: AuthUser) => {
    setUser({
      ...authenticatedUser,
      email: authenticatedUser.email.trim(),
      name: authenticatedUser.name?.trim(),
      phone: authenticatedUser.phone?.trim(),
    });

    setIsAuthModalOpen(false);
    setIsRegisterUserModalOpen(false);
    pendingAction?.();
    setPendingAction(undefined);
  };

  const authenticate = (data: AuthLoginData | AuthRegisterData) => {
    completeAuthentication(data);
  };

  const logout = () => {
    setUser(null);
    setPendingAction(undefined);
  };

  const requestAuthentication = (onAuthenticated?: () => void) => {
    if (user) {
      onAuthenticated?.();
      return;
    }

    setPendingAction(() => onAuthenticated);
    setIsAuthModalOpen(true);
  };

  const openRegisterUserModal = () => {
    setIsAuthModalOpen(false);
    setIsRegisterUserModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAuthModalOpen,
        authenticate,
        logout,
        requestAuthentication,
        closeAuthModal,
      }}
    >
      {children}

      <AuthModal
        open={isAuthModalOpen}
        onClose={closeAuthModal}
        onAuthenticate={authenticate}
        onOpenRegister={openRegisterUserModal}
      />

      <RegisterUserModal
        open={isRegisterUserModalOpen}
        onClose={closeAuthModal}
        onRegister={authenticate}
      />
    </AuthContext.Provider>
  );
}
