import { X } from "lucide-react";
import { cn } from "../../../utils/mergeClass";
import type { IProductsDetailsCloseButtonProps } from "./types";

export function ProductsDetailsCloseButton({
  onClick,
  className,
}: IProductsDetailsCloseButtonProps) {
  if (!onClick) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Fechar detalhes do produto"
      onClick={onClick}
      className={cn(
        "absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface/90 text-text shadow-sm transition hover:border-primary-light hover:bg-primary-light hover:text-primary-dark",
        className,
      )}
    >
      <X size={18} />
    </button>
  );
}
