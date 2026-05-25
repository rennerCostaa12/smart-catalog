import { cn } from "../../../utils/mergeClass";
import type { IProductsCardFooterProps } from "./types";

export function ProductsCardFooter({
  children,
  className,
}: IProductsCardFooterProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}
    </div>
  );
}
