import { ChevronRight } from "lucide-react";
import { cn } from "../../../utils/mergeClass";
import type { IProductsCardIconProps } from "./types";

export function ProductsCardIcon({
  className,
  size = 40,
}: IProductsCardIconProps) {
  return <ChevronRight size={size} className={cn("text-primary", className)} />;
}
