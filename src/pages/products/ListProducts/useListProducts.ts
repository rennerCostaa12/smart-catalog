import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState, useMemo, useEffect } from "react";
import { CategoryEnum, type ProductFilter } from "../types";
import { useCart } from "../../../context/cart/useCart";
import { useCatalogClient } from "../../../context/catalogClient/useCatalogClient";

import { useDebounceFn } from "../../../hooks/useDebounceFn";
import type { ProductsProps } from "../../../services";
import { productsQueryOptions } from "../../../services/products/queries";
import { useMobile } from "../../../hooks/useMobile";
import { BREAKPOINTS } from "../../../hooks/useMobile/constants";
import { PRODUCTS_PER_PAGE } from "./constants";

export function useListProducts() {
  const { getInfoCatalogClient } = useCatalogClient();
  const [productSelected, setProductSelected] = useState<ProductsProps | null>(
    null,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchItem, setSearchItem] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [mobileProducts, setMobileProducts] = useState<ProductsProps[]>([]);

  const nameCategory = searchParams.get("categoria");
  const pageParam = Number(searchParams.get("pagina"));
  const currentPage =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const catalogClient = getInfoCatalogClient();

  const { addCart } = useCart();
  const {
    data: productsResponse,
    error,
    isFetching,
    isPending,
    refetch,
  } = useQuery(
    productsQueryOptions({
      catalogClientName: catalogClient?.slug ?? "",
      page: currentPage,
      limit: PRODUCTS_PER_PAGE,
    }),
  );
  const products = productsResponse?.data?.products ?? [];
  const pagination = productsResponse?.data?.pagination;

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
    setMobileProducts([]);
    setSearchParams({ categoria: category.toLocaleLowerCase() });
  };

  const handleSearch = useDebounceFn((text: string) => {
    setSearchItem(text);
    setProductSelected(null);
    setMobileProducts([]);
    setSearchParams((currentSearchParams) => {
      currentSearchParams.delete("pagina");
      return currentSearchParams;
    });
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

  const handlePageChange = (page: number) => {
    setProductSelected(null);
    setSearchParams((currentSearchParams) => {
      if (page === 1) {
        currentSearchParams.delete("pagina");
      } else {
        currentSearchParams.set("pagina", String(page));
      }

      return currentSearchParams;
    });
  };

  const isMobile = useMobile({ breakpoint: BREAKPOINTS.sm });

  const itemsFiltered = useMemo(() => {
    const filteredProducts = products?.filter((product) =>
      product.name
        .toLocaleLowerCase()
        .includes(searchItem?.toLocaleLowerCase()),
    );

    if (nameCategory !== CategoryEnum.ALL) {
      return filteredProducts?.filter(
        (data) =>
          data?.categoryName?.toLocaleLowerCase() ===
          nameCategory?.toLocaleLowerCase(),
      );
    }

    return filteredProducts;
  }, [searchItem, products, nameCategory]);

  const mobileItemsFiltered = useMemo(() => {
    const loadedProducts = mobileProducts?.length ? mobileProducts : products;
    const filteredProducts = loadedProducts?.filter((product) =>
      product.name
        .toLocaleLowerCase()
        .includes(searchItem?.toLocaleLowerCase()),
    );

    if (nameCategory !== CategoryEnum.ALL) {
      return filteredProducts?.filter(
        (data) =>
          data?.categoryName?.toLocaleLowerCase() ===
          nameCategory?.toLocaleLowerCase(),
      );
    }

    return filteredProducts;
  }, [mobileProducts, nameCategory, products, searchItem]);

  useEffect(() => {
    const receivedProducts = productsResponse?.data?.products;

    if (!receivedProducts) {
      return;
    }

    setMobileProducts((currentProducts) => {
      if (currentPage === 1) {
        return receivedProducts;
      }

      const productsById = new Map(
        [...currentProducts, ...receivedProducts]?.map((product) => [
          product.id,
          product,
        ]),
      );

      return [...productsById?.values()];
    });
  }, [currentPage, productsResponse]);

  useEffect(() => {
    if (!nameCategory) {
      setSearchParams({ categoria: CategoryEnum.ALL }, { replace: true });
    }
  }, [nameCategory, setSearchParams]);

  useEffect(() => {
    if (pagination?.totalPages && currentPage > pagination?.totalPages) {
      handlePageChange(pagination.totalPages);
    }
  }, [currentPage, pagination?.totalPages]);

  const hasNotProducts =
    mobileItemsFiltered?.length > 0 || itemsFiltered?.length > 0;

  return {
    handleSelectItem,
    productSelected,
    handleCloseDetailsProduct,
    handleAddInCart,
    itemsFiltered,
    mobileItemsFiltered,
    handleSelectCategory,
    nameCategory,
    searchValue,
    handleChangeSearch,
    handleClearSearch,
    currentPage,
    totalPages: pagination?.totalPages ?? 1,
    handlePageChange,
    error,
    isFetching,
    isPending,
    refetch,
    isMobile,
    hasNotProducts,
  };
}
