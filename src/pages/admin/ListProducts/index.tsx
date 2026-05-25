import { Plus, ShoppingCart } from "lucide-react";

import { Container } from "../../../components/Container";
import { ProductsCard } from "../../../components/ProductsCard";
import { Button } from "../../../components/ui/button";
import { Typography } from "../../../components/ui/typography";
import { ThemeColors } from "../../../constants/themeColors";

import { mockProducts } from "./constants";

export function ListProductsPage() {
  return (
    <Container className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <section className="w-full rounded-2xl border border-border py-8 px-10 flex items-center justify-between">
        <div className="flex flex-col gap-10">
          <Typography variant="h1" weight="medium" className="w-[350px]">
            Organize seu catálogo com simplicidade
          </Typography>

          <div>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Plus />}
              className="cursor-pointer"
            >
              Novo Produto
            </Button>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-border shadow-2xl p-6">
            <ShoppingCart size={100} color={ThemeColors.secondary} />
          </div>
        </div>
      </section>

      <section className="w-full mt-10">
        <div className="flex items-center justify-between">
          <Typography variant="h3" weight="medium">
            Produtos
          </Typography>

          <Button
            variant="ghost"
            size="lg"
            className="cursor-pointer !text-secondary"
          >
            Ver todos
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockProducts.map((product) => (
            <ProductsCard.Root
              key={product.id}
              className="flex h-full flex-col"
            >
              <ProductsCard.Image
                src={product.image}
                alt={product.title}
              />

              <ProductsCard.Content className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <ProductsCard.Title>{product.title}</ProductsCard.Title>

                  <ProductsCard.Footer>
                    <ProductsCard.Price price={product.price} />
                    <ProductsCard.Icon />
                  </ProductsCard.Footer>
                </div>

                <ProductsCard.Button>Ver Produto</ProductsCard.Button>
              </ProductsCard.Content>
            </ProductsCard.Root>
          ))}
        </div>
      </section>
    </Container>
  );
}
