import { LogOut, UserCircle } from "lucide-react";
import { Typography } from "../../../ui/typography";
import { Button } from "../../../ui/button";
import type { IMenuUserProps } from "./types";

export function MenuUserDesktop({ logout, username }: IMenuUserProps) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-surface-soft px-3 py-2 max-sm:max-w-36">
      <UserCircle className="shrink-0 text-primary max-lg:hidden" size={30} />

      <Typography
        className="truncate max-sm:text-xs"
        variant="body"
        weight="medium"
      >
        {username?.toLocaleUpperCase()}
      </Typography>

      <Button
        variant="ghost"
        className="!p-0 !px-2 block cursor-pointer"
        title="Sair"
        onClick={logout}
      >
        <LogOut size={20} className="text-primary" />
      </Button>
    </div>
  );
}
