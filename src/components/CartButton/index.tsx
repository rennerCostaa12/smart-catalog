import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "../ui/button";
import type { ICartButtonProps } from "./types";
import { Typography } from "../ui/typography";

export function CartButton({ itemsCart }: ICartButtonProps) {
  const navigate = useNavigate();

  const hasExistItems = itemsCart.length > 0;
  const qntItemsCart = itemsCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleRedirectCart = () => {
    navigate("/produtos/carrinhos");
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={handleRedirectCart}
      >
        {hasExistItems && (
          <div className="bg-primary rounded-full px-2 absolute top-0 right-2">
            <Typography variant="caption" color="white" weight="bold">
              {qntItemsCart}
            </Typography>
          </div>
        )}
        <ShoppingCart cursor={30} />
      </Button>
    </div>
  );
}
