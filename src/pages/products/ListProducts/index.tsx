import { ProductsCard } from "../../../components/ProductsCard";
import { Button } from "../../../components/ui/button";
import { Typography } from "../../../components/ui/typography";
import { productFilters } from "../constants";

import { ProductsDetails } from "../../../components/ProductsDetails";

import { useListProducts } from "./useListProducts";
import { Input } from "../../../components/ui/input";
import { Search, X } from "lucide-react";

export function ListProductsPage() {
  const {
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
  } = useListProducts();

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex max-lg:block gap-4">
        <div>
          <div>
            <Typography variant="h1">Catálogo de Produtos</Typography>

            <Typography variant="body" color="muted">
              Conheça nossos produtos
            </Typography>
          </div>

          <div className="mt-6 w-full max-w-full overflow-x-auto pb-2">
            <div className="flex min-w-max flex-nowrap gap-3">
              {productFilters.map((filter, index) => (
                <Button
                  className="shrink-0 cursor-pointer whitespace-nowrap"
                  key={index}
                  variant={
                    filter.toLocaleLowerCase() === nameCategory
                      ? "primary"
                      : "outline"
                  }
                  size="md"
                  type="button"
                  onClick={() => handleSelectCategory(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          <div className="relative mt-4 max-w-[545px]">
            <Input
              rightIcon={<Search />}
              placeholder="Buscar produtos"
              value={searchValue}
              onChange={(event) => handleChangeSearch(event.target.value)}
            />

            {searchValue && (
              <button
                type="button"
                aria-label="Limpar busca"
                className="absolute top-1/2 right-11 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                onClick={handleClearSearch}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 max-sm:grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
            {itemsFiltered.map((product) => (
              <ProductsCard.Root
                className="h-auto w-full cursor-pointer transition-transform hover:scale-[1.02]"
                key={product.title}
                onClick={() => handleSelectItem(product)}
              >
                <ProductsCard.Image src={product.url_img} alt={product.title} />

                <ProductsCard.Content>
                  <ProductsCard.Title>{product.title}</ProductsCard.Title>

                  <ProductsCard.Footer>
                    <ProductsCard.Price price={product.price} />
                    <ProductsCard.Icon className="max-sm:hidden" />
                  </ProductsCard.Footer>
                </ProductsCard.Content>
              </ProductsCard.Root>
            ))}
          </div>
        </div>

        {productSelected && (
          <>
            <button
              type="button"
              aria-label="Fechar detalhes do produto"
              className="fixed inset-0 z-40 bg-black/55 hidden max-lg:block"
              onClick={handleCloseDetailsProduct}
            />

            <div className="fixed inset-x-0 bottom-0 z-40 lg:static lg:w-full lg:p-0">
              <ProductsDetails.Root>
                <ProductsDetails.CloseButton
                  onClick={handleCloseDetailsProduct}
                />
                <ProductsDetails.Image
                  src={productSelected.url_img}
                  alt={productSelected.title}
                />
                <ProductsDetails.Content>
                  <ProductsDetails.Category>
                    {productSelected.category}
                  </ProductsDetails.Category>
                  <ProductsDetails.Title>
                    {productSelected.title}
                  </ProductsDetails.Title>
                  <ProductsDetails.Price price={productSelected.price} />
                  <ProductsDetails.Button
                    onClick={() => handleAddInCart(productSelected)}
                  />
                </ProductsDetails.Content>
              </ProductsDetails.Root>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
