import { ProductsCard } from "../../../../../components/ProductsCard";
import type { IListProductsProps } from "../types";

export function ProductsMobile({
  error,
  items,
  handleSelectItem,
}: IListProductsProps) {

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:hidden">
      {!error &&
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
              </ProductsCard.Footer>
            </ProductsCard.Content>
          </ProductsCard.Root>
        ))}
    </div>
  );
}
