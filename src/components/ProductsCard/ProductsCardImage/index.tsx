import { cn } from "../../../utils/mergeClass";
import type { IProductsCardImageProps } from "./types";

export function ProductsCardImage({
  src,
  alt,
  className,
}: IProductsCardImageProps) {
  return (
    <div className={cn("aspect-square w-full bg-surface-soft", className)}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
