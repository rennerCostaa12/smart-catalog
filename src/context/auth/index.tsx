import { createContext, useCallback, useEffect, useState } from "react";

import { AuthModal } from "./components/AuthModal";
import { RegisterUserModal } from "./components/RegisterUserModal";
import {
  clearAuthSessionCookie,
  getAuthSessionExpiration,
  isAuthSessionValid,
  readAuthSessionCookie,
  writeAuthSessionCookie,
} from "./sessionCookie";
import type { AuthContextData, AuthProviderProps, AuthUser } from "./types";
import { Mask } from "../../utils/mask";

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
    const sessionUser = {
      id: authenticatedUser.id,
      email: authenticatedUser.email.trim(),
      name: authenticatedUser.name.trim(),
      token: authenticatedUser.token,
      phone: Mask.phone(authenticatedUser?.phone.trim()),
    };

    if (!writeAuthSessionCookie(sessionUser)) {
      setUser(null);
      return;
    }

    setUser(sessionUser);

    setIsAuthModalOpen(false);
    setIsRegisterUserModalOpen(false);
    pendingAction?.();
    setPendingAction(undefined);
  };

  const logout = useCallback(() => {
    clearAuthSessionCookie();
    setUser(null);
    setPendingAction(undefined);
  }, []);

  useEffect(() => {
    setUser(readAuthSessionCookie());
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const expiresAt = getAuthSessionExpiration(user);

    if (!expiresAt || !isAuthSessionValid(user)) {
      logout();
      return;
    }

    let timeout: number;
    const scheduleExpirationCheck = () => {
      const remainingTime = expiresAt - Date.now();

      if (remainingTime <= 0) {
        logout();
        return;
      }

      timeout = window.setTimeout(
        scheduleExpirationCheck,
        Math.min(remainingTime, 2_147_483_647),
      );
    };

    scheduleExpirationCheck();

    return () => window.clearTimeout(timeout);
  }, [logout, user]);

  const requestAuthentication = (onAuthenticated?: () => void) => {
    if (user && isAuthSessionValid(user)) {
      onAuthenticated?.();
      return;
    }

    if (user) {
      logout();
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
        authenticate: completeAuthentication,
        logout,
        requestAuthentication,
        closeAuthModal,
      }}
    >
      {children}

      <AuthModal
        open={isAuthModalOpen}
        onClose={closeAuthModal}
        onAuthenticate={completeAuthentication}
        onOpenRegister={openRegisterUserModal}
      />

      <RegisterUserModal
        open={isRegisterUserModalOpen}
        onClose={closeAuthModal}
        onRegister={completeAuthentication}
      />
    </AuthContext.Provider>
  );
}
