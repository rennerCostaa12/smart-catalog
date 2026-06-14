import { useLocation, useNavigate, useResolvedPath } from "react-router";
import type { MouseEvent } from "react";
import { ROUTE_SEGMENTS } from "../../../app/constants";
import { HelpCard } from "../HelpCard";
import { LogoApp } from "../LogoApp";
import { Typography } from "../ui/typography";
import { MenuItem } from "./components/MenuItem";
import type { ISideMenuProps } from "./types";
import { useCart } from "../../context/cart/useCart";
import { useAuth } from "../../context/auth/useAuth";
import type { IMenuItemProps } from "./components/MenuItem/types";

export function SideMenu({
  className,
  onNavigate,
  menuItems = [],
}: ISideMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  const { isAuthenticated, requestAuthentication } = useAuth();
  const hasCartItems = cart.length > 0;

  const handleNavigate = (
    event: MouseEvent<HTMLAnchorElement>,
    item: IMenuItemProps,
  ) => {
    if (
      item.href !== ROUTE_SEGMENTS.products.carts ||
      !hasCartItems ||
      isAuthenticated
    ) {
      onNavigate?.();
      return;
    }

    event.preventDefault();
    onNavigate?.();
    requestAuthentication(() => navigate(ROUTE_SEGMENTS.products.carts));
  };

  return (
    <aside
      className={`w-full border-b border-border bg-surface shadow-sm lg:max-w-xs lg:border-r lg:border-b-0 ${className}`}
    >
      <div className="flex h-full flex-col justify-between gap-6 p-4 sm:p-5">
        <div>
          <div className="max-lg:block hidden">
            <LogoApp width={200} className="min-w-[200px]" />
          </div>

          <nav aria-label="Menu lateral">
            <ul className="grid gap-2 lg:grid-cols-1">
              {menuItems.map((item) => {
                const resolvedPath = useResolvedPath(item.href);

                return (
                  <MenuItem
                    key={item.href}
                    {...item}
                    selected={location.pathname === resolvedPath.pathname}
                    onClick={(event) => handleNavigate(event, item)}
                  />
                );
              })}
            </ul>
          </nav>
        </div>

        <div>
          <HelpCard />

          <div className="mt-4 border-t border-border py-4">
            <Typography>© Smart Catalog</Typography>

            <Typography variant="bodySmall" color="muted">
              Todos os direitos reservados.
            </Typography>
          </div>
        </div>
      </div>
    </aside>
  );
}
