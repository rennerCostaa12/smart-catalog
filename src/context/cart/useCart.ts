import { useContext } from "react";
import { CartContext } from ".";

export function useCart() {
  return useContext(CartContext);
}
