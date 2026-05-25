import { UserCircle2 } from "lucide-react";
import { cn } from "../../../../utils/mergeClass";
import type { IAvatarProps } from "./types";

import { useAvatar } from "./useAvatar";
import { avatarSizeClasses } from "./constants";

export function Avatar({
  src,
  alt = "Avatar do usuario",
  name,
  size = "md",
  className,
}: IAvatarProps) {
  const { initialsName } = useAvatar({ name });

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-slate-100 text-slate-700",
        avatarSizeClasses[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : initialsName ? (
        <span className="font-semibold">{initialsName}</span>
      ) : (
        <UserCircle2 className="h-[70%] w-[70%]" />
      )}
    </div>
  );
}
