import { cn } from "../../../utils/mergeClass";
import type { IProductsDetailsContentProps } from "./types";

export function ProductsDetailsContent({
  children,
  className,
}: IProductsDetailsContentProps) {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>;
}
