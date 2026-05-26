import { cn } from "../../../utils/mergeClass";
import { Typography } from "../../ui/typography";
import type { IProductsDetailsDescriptionProps } from "./types";

export function ProductsDetailsDescription({
  children,
  className,
}: IProductsDetailsDescriptionProps) {
  return (
    <Typography
      variant="body"
      color="muted"
      className={cn("text-sm leading-6 sm:text-base", className)}
    >
      {children}
    </Typography>
  );
}
