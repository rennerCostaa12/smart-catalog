import { useEffect } from "react";
import { useNavigate } from "react-router";

import { ROUTE_SEGMENTS } from "../../../../app/constants";
import { readAuthSessionCookie } from "../../../context/auth/sessionCookie";
import { useAuth } from "../../../context/auth/useAuth";

export function useMyOrders() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !readAuthSessionCookie()) {
      navigate(`../${ROUTE_SEGMENTS.products.listProducts}?categoria=todos`, {
        replace: true,
      });
    }
  }, [navigate, user]);

  return {};
}
