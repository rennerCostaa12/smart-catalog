import type { LucideIcon } from "lucide-react";

export interface IMenuItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  selected?: boolean;
  onClick?: () => void;
}
