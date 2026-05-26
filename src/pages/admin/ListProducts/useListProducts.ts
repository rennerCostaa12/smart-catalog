import { useState } from "react";
import type { IProductsAdminProps } from "./types";

export function useListProducts() {
  const [productSelected, setProductSelected] =
    useState<IProductsAdminProps | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCloseProductsDetails = () => {
    setProductSelected(null);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleSelectProduct = (product: IProductsAdminProps) => {
    setProductSelected(product);
  };

  const handleOpenEditProduct = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditProduct = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteProduct = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteProduct = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteProduct = () => {
    if (!productSelected) {
      return;
    }

    console.log("productId", productSelected.id);
    handleCloseProductsDetails();
  };

  const handleSubmitProduct = (product: IProductsAdminProps) => {
    console.log("updatedProduct", product);
  };

  return {
    handleCloseProductsDetails,
    handleCloseEditProduct,
    handleCloseDeleteProduct,
    productSelected,
    isEditModalOpen,
    isDeleteModalOpen,
    handleSelectProduct,
    handleOpenEditProduct,
    handleOpenDeleteProduct,
    handleDeleteProduct,
    handleSubmitProduct,
  };
}
