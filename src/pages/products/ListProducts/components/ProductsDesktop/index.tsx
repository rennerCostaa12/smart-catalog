import { ProductsCard } from "../../../../../components/ProductsCard";
import type { IListProductsProps } from "../types";

export function ProductsDesktop({
  isPending,
  error,
  items,
  handleSelectItem,
}: IListProductsProps) {
  return (
    <div className="mt-8 hidden grid-cols-2 gap-4 sm:grid sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
      {!isPending &&
        !error &&
        items.map((product) => (
          <ProductsCard.Root
            className="h-auto w-full cursor-pointer transition-transform hover:scale-[1.02]"
            key={product.id}
            onClick={() => handleSelectItem(product)}
          >
            <ProductsCard.Image src={product.imageUrl} alt={product.name} />

            <ProductsCard.Content>
              <ProductsCard.Title>{product.name}</ProductsCard.Title>

              <ProductsCard.Footer>
                <ProductsCard.Price price={product.value} />
                <ProductsCard.Icon className="max-sm:hidden" />
              </ProductsCard.Footer>
            </ProductsCard.Content>
          </ProductsCard.Root>
        ))}
    </div>
  );
}
