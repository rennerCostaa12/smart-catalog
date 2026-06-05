import { useContext } from "react";

import { AuthContext } from ".";

export function useAuth() {
  const contextAuth = useContext(AuthContext);

  if (!contextAuth) {
    throw new Error("contextAuth precisa estar englobado pelo AuthProvider");
  }
  return contextAuth;
}
