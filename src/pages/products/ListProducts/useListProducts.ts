import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState, useMemo, useEffect } from "react";
import { CategoryEnum, type ProductFilter } from "../types";
import { useCart } from "../../../context/cart/useCart";
import { useCatalogClient } from "../../../context/catalogClient/useCatalogClient";

import { useDebounceFn } from "../../../hooks/useDebounceFn";
import type { ProductsProps } from "../../../services";
import { productsQueryOptions } from "../../../services/products/queries";

export function useListProducts() {
  const { getInfoCatalogClient } = useCatalogClient();
  const [productSelected, setProductSelected] = useState<ProductsProps | null>(
    null,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchItem, setSearchItem] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const nameCategory = searchParams.get("categoria");

  const catalogClient = getInfoCatalogClient();

  const { addCart } = useCart();
  const {
    data: productsResponse,
    error,
    isPending,
    refetch,
  } = useQuery(productsQueryOptions({ catalogClientName: catalogClient?.slug as string }));
  const products = productsResponse?.data?.products ?? [];

  const handleSelectItem = (product: ProductsProps) => {
    setProductSelected(product);
  };

  const handleCloseDetailsProduct = () => {
    setProductSelected(null);
  };

  const handleAddInCart = (product: ProductsProps) => {
    addCart(product);
  };

  const handleSelectCategory = (category: ProductFilter) => {
    setSearchParams(`?categoria=${category.toLocaleLowerCase()}`);
  };

  const handleSearch = useDebounceFn((text: string) => {
    setSearchItem(text);
    setProductSelected(null);
  }, 500);

  const handleChangeSearch = (text: string) => {
    setSearchValue(text);
    handleSearch(text);
  };

  const handleClearSearch = () => {
    handleSearch.cancel();
    setSearchValue("");
    setSearchItem("");
    setProductSelected(null);
  };

  const itemsFiltered = useMemo(() => {
    const filteredProducts = products.filter((product) =>
      product.name
        .toLocaleLowerCase()
        .includes(searchItem?.toLocaleLowerCase()),
    );

    if (nameCategory !== CategoryEnum.ALL) {
      return filteredProducts.filter(
        (data) =>
          data?.categoryName?.toLocaleLowerCase() ===
          nameCategory?.toLocaleLowerCase(),
      );
    }

    return filteredProducts;
  }, [searchItem, products, nameCategory]);

  useEffect(() => {
    if (!nameCategory) {
      setSearchParams({ categoria: CategoryEnum.ALL }, { replace: true });
    }
  }, [nameCategory, setSearchParams]);

  return {
    handleSelectItem,
    productSelected,
    handleCloseDetailsProduct,
    handleAddInCart,
    itemsFiltered,
    handleSelectCategory,
    nameCategory,
    searchValue,
    handleChangeSearch,
    handleClearSearch,
    error,
    isPending,
    refetch,
  };
}
