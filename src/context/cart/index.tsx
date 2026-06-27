import { createContext, useState } from "react";
import type { ProductsProps } from "../../services/products/types";
import type { CartProviderProps, ICartContextData, ICartItem } from "./types";

export const CartContext = createContext({} as ICartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const addCart = (product: ProductsProps) => {
    setCart((prevCart) => {
      const productExists = prevCart.find((item) => item.id === product.id);

      if (productExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.flatMap((item) => {
        if (item.id !== productId) {
          return [item];
        }

        if (item.quantity === 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  };

  const removeProductCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const resetCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addCart, removeCart, removeProductCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
