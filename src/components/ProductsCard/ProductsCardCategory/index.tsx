import { cn } from "../../../utils/mergeClass";
import { Typography } from "../../ui/typography";
import type { IProductsCardCategoryProps } from "./types";

export function ProductsCardCategory({
  children,
  className,
}: IProductsCardCategoryProps) {
  return (
    <Typography
      variant="bodySmall"
      color="primary"
      className={cn("uppercase tracking-[0.2em]", className)}
    >
      {children}
    </Typography>
  );
}
