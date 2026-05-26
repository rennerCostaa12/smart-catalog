import { cn } from "../../../utils/mergeClass";
import type { IProductsDetailsRootProps } from "./types";

export function ProductsDetailsRoot({
  children,
  className,
}: IProductsDetailsRootProps) {
  return (
    <section
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm max-lg:rounded-b-none",
        className,
      )}
    >
      {children}
    </section>
  );
}
