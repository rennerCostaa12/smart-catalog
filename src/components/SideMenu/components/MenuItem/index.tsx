import { Link } from "react-router";
import { Typography } from "../../../ui/typography";
import { cn } from "../../../../utils/mergeClass";
import type { IMenuItemProps } from "./types";

export function MenuItem({
  label,
  href,
  icon: Icon,
  selected = false,
  onClick,
}: IMenuItemProps) {
  return (
    <Link
      className={cn(
        "flex items-center gap-3 rounded-2xl border px-4 py-3 transition",
        selected
          ? "border-primary bg-primary-light text-primary-dark"
          : "border-transparent text-text hover:border-primary-light hover:bg-primary-light hover:text-primary-dark",
      )}
      to={href}
      onClick={onClick}
    >
      <span className="shrink-0">
        <Icon
          size={25}
          className={selected ? "text-primary" : "text-slate-950"}
        />
      </span>
      <Typography
        className="font-medium"
        color={selected ? "primary" : "default"}
      >
        {label}
      </Typography>
    </Link>
  );
}
