import type { ReactNode } from "react";
import type { IProductsMockProps } from "../../pages/products/types";

export interface ICartItem extends IProductsMockProps {
  quantity: number;
}

export interface ICartContextData {
  cart: ICartItem[];
  addCart: (product: IProductsMockProps) => void;
  removeCart: (productTitle: string) => void;
  removeProductCart: (productTitle: string) => void;
}

export type CartProviderProps = {
  children: ReactNode;
};
