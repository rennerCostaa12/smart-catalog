import { Search, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Typography } from "../../../components/ui/typography";
import { ProductsDetails } from "../../../components/ProductsDetails";
import { Input } from "../../../components/ui/input";

import { productFilters } from "../constants";

import { useListProducts } from "./useListProducts";

import { LoadingSpinner } from "../../../components/ui/LoadingSpinner";
import { Pagination } from "../../../components/Pagination";
import { ProductsDesktop } from "./components/ProductsDesktop";
import { ProductsMobile } from "./components/ProductsMobile";

export function ListProductsPage() {
  const {
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
    totalPages,
    handlePageChange,
    error,
    isFetching,
    isPending,
    refetch,
    isMobile,
    hasShowProducts,
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

          {isPending && (
            <LoadingSpinner
              size={40}
              className="w-full flex justify-center items-center mt-4"
            />
          )}

          {error && (
            <div className="mt-8 flex items-center gap-3">
              <Typography color="danger">
                Não foi possível carregar os produtos.
              </Typography>
              <Button variant="outline" onClick={() => refetch()}>
                Tentar novamente
              </Button>
            </div>
          )}

          {isMobile ? (
            <ProductsMobile
              handleSelectItem={handleSelectItem}
              items={mobileItemsFiltered}
              error={error}
            />
          ) : (
            <ProductsDesktop
              handleSelectItem={handleSelectItem}
              items={itemsFiltered}
              error={error}
              isPending={isPending}
            />
          )}

          {!error && hasShowProducts && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disabled={isPending}
                isLoadingMore={isFetching && currentPage > 1}
              />
            </div>
          )}
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
                  src={productSelected.imageUrl}
                  alt={productSelected.name}
                />
                <ProductsDetails.Content>
                  <ProductsDetails.Category>
                    {productSelected.categoryName}
                  </ProductsDetails.Category>
                  <ProductsDetails.Title>
                    {productSelected.name}
                  </ProductsDetails.Title>
                  <ProductsDetails.Price price={productSelected.value} />
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
