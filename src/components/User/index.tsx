import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/mergeClass";
import { Typography } from "../ui/typography";
import { Avatar } from "./components/Avatar";
import { UserMenu } from "./components/UserMenu";
import type { IUserProps } from "./types";

import { useUser } from "./useUser";

export function User({
  name,
  avatarSrc,
  onSettings,
  onLogout,
  className,
}: IUserProps) {
  const { containerRef, handleLogout, handleSettings, isOpen, setIsOpen } =
    useUser({
      onLogout,
      onSettings,
    });

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        className="flex items-center gap-3 rounded-2xl cursor-pointer bg-white px-3 py-2 text-left transition-colors hover:bg-slate-50"
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Avatar src={avatarSrc} name={name} size="md" />

        <div className="hidden min-w-0 sm:block">
          <Typography className="truncate" variant="body" weight="semibold">
            {name}
          </Typography>
        </div>

        <ChevronDown
          size={18}
          className={cn(
            "text-slate-500 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen ? (
        <UserMenu
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50"
          onSettings={handleSettings}
          onLogout={handleLogout}
        />
      ) : null}
    </div>
  );
}
