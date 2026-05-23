import { useState } from "react";
import type { IProductsMockProps } from "../types";
import { useCart } from "../../../context/cart/useCart";

export function useListProducts() {
  const [productSelected, setProductSelected] =
    useState<IProductsMockProps | null>(null);

  const { addCart } = useCart();

  const handleSelectItem = (product: IProductsMockProps) => {
    setProductSelected(product);
  };

  const handleCloseDetailsProduct = () => {
    setProductSelected(null);
  };

  const handleAddInCart = (product: IProductsMockProps) => {
    addCart(product);
  };

  return {
    handleSelectItem,
    productSelected,
    handleCloseDetailsProduct,
    handleAddInCart,
  };
}
