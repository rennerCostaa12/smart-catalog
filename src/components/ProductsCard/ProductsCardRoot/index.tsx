import { cn } from "../../../utils/mergeClass";
import type { IProductsCardRootProps } from "./types";

export function ProductsCardRoot({
  children,
  className,
  onClick,
}: IProductsCardRootProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-sm",
        className,
      )}
    >
      {children}
    </article>
  );
}
