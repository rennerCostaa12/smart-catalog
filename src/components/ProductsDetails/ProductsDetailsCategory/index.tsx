import { cn } from "../../../utils/mergeClass";
import { Typography } from "../../ui/typography";
import type { IProductsDetailsCategoryProps } from "./types";

export function ProductsDetailsCategory({
  children,
  className,
}: IProductsDetailsCategoryProps) {
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
