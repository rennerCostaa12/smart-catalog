import { cn } from "../../../utils/mergeClass";
import type { IProductsCardContentProps } from "./types";

export function ProductsCardContent({
  children,
  className,
}: IProductsCardContentProps) {
  return <div className={cn("flex flex-col gap-2 p-5", className)}>{children}</div>;
}
