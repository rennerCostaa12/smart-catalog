import { Typography } from "../ui/typography";
import { orderStatusColor } from "./constants";
import type { IStatusBadgeProps } from "./types";

export function StatusBadge({ status }: IStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-lg border px-4 py-2",
        "before:block before:size-2 before:shrink-0 before:rounded-full",
        orderStatusColor[status].className,
      ].join(" ")}
    >
      <Typography
        as="span"
        variant="label"
        weight="semibold"
        color={orderStatusColor[status].color}
      >
        {status}
      </Typography>
    </span>
  );
}
