import { cn } from "../../../utils/mergeClass";
import type { ITabListProps } from "./types";

export function TabList({ children, className }: ITabListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex w-fit flex-wrap items-center gap-2 rounded-2xl border border-border bg-surface p-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
