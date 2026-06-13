import { useEffect } from "react";
import { useNavigate } from "react-router";

import { ROUTES } from "../../../../app/constants";
import { readAuthSessionCookie } from "../../../context/auth/sessionCookie";
import { useAuth } from "../../../context/auth/useAuth";

export function useMyOrders() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !readAuthSessionCookie()) {
      navigate(`${ROUTES.products.listProducts}?categoria=todos`, {
        replace: true,
      });
    }
  }, [navigate, user]);

  return {};
}
