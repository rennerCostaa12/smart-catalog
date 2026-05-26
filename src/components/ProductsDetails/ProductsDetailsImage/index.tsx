import { cn } from "../../../utils/mergeClass";
import type { IProductsDetailsImageProps } from "./types";

export function ProductsDetailsImage({
  src,
  alt,
  className,
  imgClassName,
}: IProductsDetailsImageProps) {
  return (
    <div className={cn("overflow-hidden rounded-[1.25rem] bg-surface-soft", className)}>
      <img
        src={src}
        alt={alt}
        className={cn("aspect-square w-full object-cover max-lg:h-[250px]", imgClassName)}
      />
    </div>
  );
}
