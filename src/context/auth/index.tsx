import { createContext, useCallback, useEffect, useState } from "react";

import { AuthModal } from "./components/AuthModal";
import { RegisterUserModal } from "./components/RegisterUserModal";
import { AUTH_SESSION_FLAG_STORAGE_KEY } from "./constants";
import type { AuthContextData, AuthProviderProps, AuthUser } from "./types";
import { Mask } from "../../utils/mask";

import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "../../services";
import type { ILogoutResponse } from "../../services/auth/types";
import { toast } from "react-toastify";
import { authMeClientQueryOptions } from "../../services/auth/queries";
import { useParams } from "react-router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { subscribeUnauthorized } from "../../http/unauthorized";

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterUserModalOpen, setIsRegisterUserModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    (() => void) | undefined
  >();
  const { catalogClientName = "" } = useParams();
  const { get: getAuthSessionFlag, setter: setAuthSessionFlag } =
    useLocalStorage(AUTH_SESSION_FLAG_STORAGE_KEY);

  const persistAuthSessionFlag = useCallback(
    (hasSession: boolean) => {
      setAuthSessionFlag(hasSession);
    },
    [setAuthSessionFlag],
  );

  useEffect(() => {
    return subscribeUnauthorized(() => {
      persistAuthSessionFlag(false);
      setUser(null);
      setIsRegisterUserModalOpen(false);
      setIsAuthModalOpen(true);
    });
  }, [persistAuthSessionFlag]);

  const shouldFetchUserData = Boolean(getAuthSessionFlag()) && !user;
  const queryOptions = authMeClientQueryOptions(catalogClientName);
  const {
    data: userData,
    isError: isErrorUser,
    refetch: refetchUserData,
    isFetching: isFetchingUser,
  } = useQuery({
    ...queryOptions,
    enabled: shouldFetchUserData,
  });

  useEffect(() => {
    if (userData) {
      setUser({
        id: userData.id,
        email: userData.email.trim(),
        name: userData.name.trim(),
        phone: Mask.phone(userData.phone.trim()),
      });
    }
  }, [userData]);

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setIsRegisterUserModalOpen(false);
    setPendingAction(undefined);
  };

  const { mutateAsync: logoutMutateAsync } = useMutation<
    ILogoutResponse,
    Error
  >({
    mutationFn: () => authService.logout(),
  });

  const completeAuthentication = (authenticatedUser: AuthUser) => {
    const sessionUser = {
      id: authenticatedUser?.id,
      email: authenticatedUser?.email.trim(),
      name: authenticatedUser?.name.trim(),
      phone: Mask.phone(authenticatedUser?.phone.trim()),
    };

    persistAuthSessionFlag(true);
    setUser(sessionUser);

    setIsAuthModalOpen(false);
    setIsRegisterUserModalOpen(false);
    pendingAction?.();
    setPendingAction(undefined);
  };

  const logout = useCallback(async () => {
    try {
      await logoutMutateAsync();

      persistAuthSessionFlag(false);
      setUser(null);
      setPendingAction(undefined);
    } catch (error) {
      console.error(error);

      persistAuthSessionFlag(false);
      setUser(null);
      setPendingAction(undefined);

      toast.error(
        (error instanceof Error ? error.message : undefined) ??
          "Não foi possível realizar logout. Tente novamente!",
      );
    }
  }, [logoutMutateAsync, persistAuthSessionFlag]);

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
        authenticate: completeAuthentication,
        logout,
        requestAuthentication,
        closeAuthModal,
        errorUserData: shouldFetchUserData && isErrorUser,
        refetchUserData,
        isLoadingUserData: shouldFetchUserData && isFetchingUser,
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
