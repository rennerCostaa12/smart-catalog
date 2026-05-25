import { Button } from "../../ui/button";
import type { IProductsCardButtonProps } from "./types";

export function ProductsCardButton({
  children,
  variant = "secondary",
  className = "w-full cursor-pointer",
  ...props
}: IProductsCardButtonProps) {
  return (
    <Button variant={variant} className={className} {...props}>
      {children}
    </Button>
  );
}
