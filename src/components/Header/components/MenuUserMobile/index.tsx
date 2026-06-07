import { UserCircle } from "lucide-react";

import { UserMenu } from "../../../User/components/UserMenu";
import { useUser } from "../../../User/useUser";
import type { IMenuUserProps } from "../../types";

export function MenuUserMobile({ logout, onSettings }: IMenuUserProps) {
  const { containerRef, handleLogout, handleSettings, isOpen, setIsOpen } =
    useUser({
      onLogout: logout,
      onSettings,
    });

  return (
    <div ref={containerRef} className="relative lg:hidden">
      <button
        type="button"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface-soft text-primary transition-colors hover:bg-slate-100"
        title="Abrir menu do usuário"
        aria-label="Abrir menu do usuário"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentState) => !currentState)}
      >
        <UserCircle size={24} />
      </button>

      {isOpen && (
        <UserMenu
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-44"
          onSettings={handleSettings}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
