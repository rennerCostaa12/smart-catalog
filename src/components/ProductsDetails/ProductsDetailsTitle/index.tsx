import { cn } from "../../../utils/mergeClass";
import { Typography } from "../../ui/typography";
import type { IProductsDetailsTitleProps } from "./types";

export function ProductsDetailsTitle({
  children,
  className,
}: IProductsDetailsTitleProps) {
  return (
    <Typography variant="h2" className={cn(className)}>
      {children}
    </Typography>
  );
}
