import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { IProductsMockProps } from "../../pages/products/types";
import type { CartProviderProps, ICartContextData, ICartItem } from "./types";

export const CartContext = createContext({} as ICartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const addCart = (product: IProductsMockProps) => {
    setCart((prevCart) => {
      const productExists = prevCart.find(
        (item) => item.title === product.title,
      );

      if (productExists) {
        return prevCart.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeCart = (productTitle: string) => {
    setCart((prevCart) =>
      prevCart.flatMap((item) => {
        if (item.title !== productTitle) {
          return [item];
        }

        if (item.quantity === 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  };

  const removeProductCart = (productTitle: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.title !== productTitle));
  };

  return (
    <CartContext.Provider
      value={{ cart, addCart, removeCart, removeProductCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
