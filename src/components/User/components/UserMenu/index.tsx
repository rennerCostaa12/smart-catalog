import { cn } from "../../../../utils/mergeClass";
import type { IUserMenuProps } from "./types";

import { menuItemClasses } from "./constants";
import { useNavigate } from "react-router";
import { useAuth } from "../../../../context/auth/useAuth";

export function UserMenu({ options, className }: IUserMenuProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div
      role="menu"
      className={cn(
        "min-w-52 rounded-2xl border border-border bg-white p-2 shadow-lg",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.name}
          type="button"
          role="menuitem"
          className={menuItemClasses}
          onClick={() => navigate(option.url)}
        >
          {option.name}
        </button>
      ))}

      <button
        type="button"
        role="menuitem"
        className={menuItemClasses}
        onClick={logout}
      >
        Sair
      </button>
    </div>
  );
}
