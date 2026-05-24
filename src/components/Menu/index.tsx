import { useEffect } from "react";
import { useLocation } from "react-router";
import { cn } from "../../utils/mergeClass";
import { SideMenu } from "../SideMenu";

import type { IMenuProps } from "./types";

export function MenuMobile({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: IMenuProps) {
  const location = useLocation();

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    handleCloseMenu();
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        aria-label="Fechar menu lateral"
        className={cn(
          "absolute inset-0 bg-slate-950/45 transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={handleCloseMenu}
      />

      <div
        className={cn(
          "absolute inset-y-0 left-0 w-[86%] max-w-sm transition-transform duration-300 ease-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SideMenu
          className="h-full border-b-0 border-r shadow-xl"
          onNavigate={handleCloseMenu}
        />
      </div>
    </div>
  );
}
