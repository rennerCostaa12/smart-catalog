import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";

export interface IMenuItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  selected?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}
