import { useState } from "react";
import type { IProductsMockProps } from "../types";

export function useListProducts() {
  const [productSelected, setProductSelected] =
    useState<IProductsMockProps | null>(null);

  const handleSelectItem = (item: any) => {
    setProductSelected(item);
  };

  const handleCloseDetailsProduct = () => {
    setProductSelected(null);
  };

  return {
    handleSelectItem,
    productSelected,
    handleCloseDetailsProduct,
  };
}
