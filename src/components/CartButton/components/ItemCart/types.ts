import type { ICartItem } from "../../../../context/cart/types";

export interface IItemCartProps {
  product: ICartItem;
  handleDecreaseCart: (productId: number) => void;
  handleIncreaseCart: (product: ICartItem) => void;
  handleRemoveProductCart: (productId: number) => void;
}
