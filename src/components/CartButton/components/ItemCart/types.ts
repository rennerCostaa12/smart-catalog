import type { ICartItem } from "../../../../context/cart/types";

export interface IItemCartProps {
  product: ICartItem;
  handleDecreaseCart: (titleProduct: string) => void;
  handleIncreaseCart: (product: ICartItem) => void;
  handleRemoveProductCart: (titleProduct: string) => void;
}
