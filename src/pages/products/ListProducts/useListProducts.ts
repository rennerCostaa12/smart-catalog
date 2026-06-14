import { useParams, useSearchParams } from "react-router";
import { useState, useMemo, useEffect } from "react";
import { CategoryEnum, type ProductFilter } from "../types";
import { useCart } from "../../../context/cart/useCart";

import { useDebounceFn } from "../../../hooks/useDebounceFn";
import { ProductsServices, type Products } from "../../../services";

export function useListProducts() {
  const { catalogClientName } = useParams();
  const [products, setProducts] = useState<Products[]>([]);
  const [productSelected, setProductSelected] = useState<Products | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchItem, setSearchItem] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const nameCategory = searchParams.get("categoria");

  const { addCart } = useCart();

  const handleSelectItem = (product: Products) => {
    setProductSelected(product);
  };

  const handleCloseDetailsProduct = () => {
    setProductSelected(null);
  };

  const handleAddInCart = (product: Products) => {
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

  const getProductsByClient = async () => {
    try {
      const productsServices = new ProductsServices();
      const response = await productsServices.getProducts({
        catalogClientName: catalogClientName as string,
      });

      setProducts(response?.data?.products);
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    getProductsByClient();
  }, []);

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
