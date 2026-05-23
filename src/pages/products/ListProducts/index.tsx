import { ProductsCard } from "../../../components/ProductsCard";
import { Button } from "../../../components/ui/button";
import { Typography } from "../../../components/ui/typography";
import { productFilters, productsMock } from "../constants";

import { ProductsDetails } from "../../../components/ProductsDetails";

import { useListProducts } from "./useListProducts";
import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";

export function ListProductsPage() {
  const {
    handleSelectItem,
    productSelected,
    handleCloseDetailsProduct,
    handleAddInCart,
  } = useListProducts();

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex max-md:block gap-4">
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
                  key={filter}
                  variant={index === 0 ? "primary" : "outline"}
                  size="md"
                  type="button"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Input rightIcon={<Search />} placeholder="Buscar produtos" />
          </div>

          <div className="mt-8 grid grid-cols-2 max-sm:grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
            {productsMock.map((product) => (
              <ProductsCard
                className="h-auto w-full cursor-pointer transition-transform hover:scale-[1.02]"
                key={product.title}
                price={product.price}
                title={product.title}
                url_img={product.url_img}
                onClick={() => handleSelectItem(product)}
              />
            ))}
          </div>
        </div>

        {productSelected && (
          <>
            <button
              type="button"
              aria-label="Fechar detalhes do produto"
              className="fixed inset-0 z-40 bg-black/55 md:hidden"
              onClick={handleCloseDetailsProduct}
            />

            <div className="fixed inset-x-0 bottom-0 z-50 md:static md:w-full md:p-0">
              <ProductsDetails
                className="max-h-[85vh] w-full overflow-y-auto md:max-h-none"
                name={productSelected?.title}
                price={productSelected?.price}
                category={productSelected.category}
                url_img={productSelected?.url_img}
                onAddToCart={() => handleAddInCart(productSelected)}
                closeProductDetails={handleCloseDetailsProduct}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
