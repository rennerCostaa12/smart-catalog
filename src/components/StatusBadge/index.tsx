import { statusStyles } from "./constants";
import type { IStatusBadgeProps } from "./types";

export function StatusBadge({ status }: IStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold",
        "before:block before:h-2 before:w-2 before:rounded-full",
        statusStyles[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}
