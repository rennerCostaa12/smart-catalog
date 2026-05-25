import { cn } from "../../../utils/mergeClass";
import { Typography } from "../../ui/typography";
import type { IProductsCardTitleProps } from "./types";

export function ProductsCardTitle({
  children,
  className,
}: IProductsCardTitleProps) {
  return <Typography className={cn("line-clamp-2", className)}>{children}</Typography>;
}
