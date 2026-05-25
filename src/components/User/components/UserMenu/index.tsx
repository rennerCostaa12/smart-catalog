import { LogOut, Settings } from "lucide-react";

import { cn } from "../../../../utils/mergeClass";
import type { IUserMenuProps } from "./types";

import { menuItemClasses } from "./constants";

export function UserMenu({ onSettings, onLogout, className }: IUserMenuProps) {
  return (
    <div
      role="menu"
      className={cn(
        "min-w-52 rounded-2xl border border-border bg-white p-2 shadow-lg",
        className,
      )}
    >
      <button
        type="button"
        role="menuitem"
        className={menuItemClasses}
        onClick={onSettings}
      >
        <Settings size={18} />
        Configurações
      </button>

      <button
        type="button"
        role="menuitem"
        className={menuItemClasses}
        onClick={onLogout}
      >
        <LogOut size={18} />
        Sair
      </button>
    </div>
  );
}
