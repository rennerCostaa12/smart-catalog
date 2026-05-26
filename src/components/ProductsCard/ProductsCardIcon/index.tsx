import { ChevronRight } from "lucide-react";
import { cn } from "../../../utils/mergeClass";
import type { IProductsCardIconProps } from "./types";

export function ProductsCardIcon({
  className,
  size = 40,
}: IProductsCardIconProps) {
  return (
    <ChevronRight
      size={size}
      className={cn("h-7 w-7 shrink-0 text-primary sm:h-10 sm:w-10", className)}
    />
  );
}
