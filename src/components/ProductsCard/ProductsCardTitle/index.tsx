import { cn } from "../../../utils/mergeClass";
import { Typography } from "../../ui/typography";
import type { IProductsCardTitleProps } from "./types";

export function ProductsCardTitle({
  children,
  className,
}: IProductsCardTitleProps) {
  return (
    <Typography
      className={cn("line-clamp-2 text-sm leading-5 sm:text-base sm:leading-7", className)}
    >
      {children}
    </Typography>
  );
}
