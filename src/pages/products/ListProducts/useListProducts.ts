import { useNavigate, useSearchParams } from "react-router";
import { useState, useMemo, useEffect } from "react";
import { ROUTES } from "../../../../app/constants";
import {
  CategoryEnum,
  type IProductsMockProps,
  type ProductFilter,
} from "../types";
import { useCart } from "../../../context/cart/useCart";

import { productsMock } from "../constants";

import { useDebounceFn } from "../../../hooks/useDebounceFn";

export function useListProducts() {
  const [productSelected, setProductSelected] =
    useState<IProductsMockProps | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchItem, setSearchItem] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const nameCategory = searchParams.get("categoria");

  const navigate = useNavigate();

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
    let product = productsMock.filter((product) =>
      product.title
        .toLocaleLowerCase()
        .includes(searchItem?.toLocaleLowerCase()),
    );

    if (nameCategory !== CategoryEnum.ALL) {
      return product.filter(
        (data) =>
          data.category.toLocaleLowerCase() ===
          nameCategory?.toLocaleLowerCase(),
      );
    }

    return product;
  }, [searchItem, productsMock, nameCategory]);

  useEffect(() => {
    if (!nameCategory) {
      navigate(`${ROUTES.products.listProducts}?categoria=todos`);
    }
  }, [nameCategory]);

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
  };
}
