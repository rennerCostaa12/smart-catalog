import { Button } from "../../ui/button";
import type { IProductsCardButtonProps } from "./types";

export function ProductsCardButton({
  children,
  variant = "secondary",
  className = "h-10 w-full cursor-pointer px-4 text-xs sm:h-11 sm:px-5 sm:text-sm",
  ...props
}: IProductsCardButtonProps) {
  return (
    <Button variant={variant} className={className} {...props}>
      {children}
    </Button>
  );
}
