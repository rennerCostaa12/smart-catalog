import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import type { ICartButtonProps } from "./types";
import { Typography } from "../ui/typography";
import { ModalListItems } from "./components/ModalListItems";
import { useState } from "react";

export function CartButton({ itemsCart }: ICartButtonProps) {
  const [showListCart, setShowListCart] = useState<boolean>(false);

  const hasExistItems = itemsCart.length > 0;
  const qntItemsCart = itemsCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleToggleListItems = () => {
    setShowListCart(!showListCart);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={handleToggleListItems}
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

      {showListCart && <ModalListItems closeModal={handleToggleListItems} />}
    </div>
  );
}
