import { cn } from "../../../utils/mergeClass";
import type { IProductsCardFooterProps } from "./types";

export function ProductsCardFooter({
  children,
  className,
}: IProductsCardFooterProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      {children}
    </div>
  );
}
