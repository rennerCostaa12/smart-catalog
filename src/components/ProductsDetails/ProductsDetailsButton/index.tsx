import { ShoppingCart } from "lucide-react";
import { Button } from "../../ui/button";
import type { IProductsDetailsButtonProps } from "./types";

export function ProductsDetailsButton({
  children = "Adicionar no carrinho",
  className = "mt-2 cursor-pointer",
  leftIcon = <ShoppingCart size={18} />,
  type = "button",
  ...props
}: IProductsDetailsButtonProps) {
  return (
    <Button
      type={type}
      leftIcon={leftIcon}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
}
