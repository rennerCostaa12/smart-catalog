import { ProductsCard } from "../../../components/ProductsCard";
import { Button } from "../../../components/ui/button";
import { Typography } from "../../../components/ui/typography";
import { productFilters, productsMock } from "../constants";

export function ListProductsPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      <div>
        <Typography variant="h1">Catálogo de Produtos</Typography>

        <Typography variant="body" color="muted">
          Conheça nossos produtos
        </Typography>
      </div>

      <div className="-mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex min-w-max flex-row gap-3 pb-2">
          {productFilters.map((filter, index) => (
            <Button
              className="cursor-pointer whitespace-nowrap"
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

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {productsMock.map((product) => (
          <ProductsCard
            className="h-auto w-full cursor-pointer transition-transform hover:scale-[1.02]"
            key={product.title}
            price={product.price}
            title={product.title}
            url_img={product.url_img}
          />
        ))}
      </div>
    </div>
  );
}
