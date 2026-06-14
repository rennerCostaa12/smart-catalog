import type { ReactNode } from "react";
import { type ProductsProps } from "../../services/products/types";
export interface ICartItem extends ProductsProps {
  quantity: number;
}

export interface ICartContextData {
  cart: ICartItem[];
  addCart: (product: ProductsProps) => void;
  removeCart: (productId: number) => void;
  removeProductCart: (productId: number) => void;
}

export type CartProviderProps = {
  children: ReactNode;
};
