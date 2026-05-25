import { useLocation, useResolvedPath } from "react-router";
import { HelpCard } from "../HelpCard";
import { LogoApp } from "../LogoApp";
import { Typography } from "../ui/typography";
import { MenuItem } from "./components/MenuItem";
import type { ISideMenuProps } from "./types";

export function SideMenu({
  className,
  onNavigate,
  menuItems = [],
}: ISideMenuProps) {
  const location = useLocation();

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
                    {...item}
                    selected={location.pathname === resolvedPath.pathname}
                    onClick={onNavigate}
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
