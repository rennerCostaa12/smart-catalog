import { ChevronDown, UserCircle } from "lucide-react";
import { Typography } from "../../../ui/typography";
import { UserMenu } from "../../../User/components/UserMenu";
import { useUser } from "../../../User/useUser";
import { cn } from "../../../../utils/mergeClass";
import type { IMenuUserProps } from "../../types";

export function MenuUserDesktop({
  logout,
  onSettings,
  username,
}: IMenuUserProps) {
  const { containerRef, handleLogout, handleSettings, isOpen, setIsOpen } =
    useUser({
      onLogout: logout,
      onSettings,
    });

  return (
    <div ref={containerRef} className="relative hidden lg:block">
      <button
        type="button"
        className="flex min-w-0 max-w-64 cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface-soft px-3 py-2 transition-colors hover:bg-slate-100"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentState) => !currentState)}
      >
        <UserCircle className="shrink-0 text-primary" size={30} />

        <Typography className="truncate" variant="body" weight="medium">
          {username?.toLocaleUpperCase()}
        </Typography>

        <ChevronDown
          className={cn(
            "shrink-0 text-slate-500 transition-transform",
            isOpen && "rotate-180",
          )}
          size={18}
        />
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
