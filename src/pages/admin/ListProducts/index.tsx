import { Pencil, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { Container } from "../../../components/Container";
import { ModalConfirmation } from "../../../components/ModalConfirmation";
import { ProductsCard } from "../../../components/ProductsCard";
import { ProductsDetails } from "../../../components/ProductsDetails";
import { Button } from "../../../components/ui/button";
import { Typography } from "../../../components/ui/typography";

import { ThemeColors } from "../../../constants/themeColors";
import { mockProducts } from "./constants";

import { ModalDetailsProduct } from "./components/ModalDetailsProduct";
import { useListProducts } from "./useListProducts";

export function ListProductsPage() {
  const {
    handleCloseProductsDetails,
    handleCloseEditProduct,
    handleCloseDeleteProduct,
    productSelected,
    isEditModalOpen,
    isDeleteModalOpen,
    handleSelectProduct,
    handleOpenEditProduct,
    handleOpenDeleteProduct,
    handleDeleteProduct,
    handleSubmitProduct,
  } = useListProducts();

  return (
    <Container className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex gap-4">
        <div>
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
                  <ProductsCard.Image src={product.image} alt={product.title} />

                  <ProductsCard.Content className="flex h-full flex-col justify-between gap-4">
                    <div className="flex flex-col gap-3">
                      <ProductsCard.Title>{product.title}</ProductsCard.Title>

                      <ProductsCard.Footer>
                        <ProductsCard.Price price={product.price} />
                        <ProductsCard.Icon />
                      </ProductsCard.Footer>
                    </div>

                    <ProductsCard.Button
                      onClick={() => handleSelectProduct(product)}
                    >
                      Ver Produto
                    </ProductsCard.Button>
                  </ProductsCard.Content>
                </ProductsCard.Root>
              ))}
            </div>
          </section>
        </div>

        {productSelected && (
          <>
            <button
              type="button"
              aria-label="Fechar detalhes do produto"
              className="fixed inset-0 z-40 hidden bg-black/55 max-lg:block"
              onClick={handleCloseProductsDetails}
            />

            <div className="fixed inset-x-0 bottom-0 z-40 lg:static lg:w-full lg:p-0">
              <ProductsDetails.Root>
                <Typography variant="h4">Produto selecionado</Typography>
                <ProductsDetails.CloseButton
                  onClick={handleCloseProductsDetails}
                />
                <ProductsDetails.Image
                  src={productSelected.image}
                  alt={productSelected.title}
                />
                <ProductsDetails.Content>
                  <ProductsDetails.Title>
                    {productSelected.title}
                  </ProductsDetails.Title>
                  <ProductsDetails.Description>
                    Estoque: {productSelected.stock} UNIDADES
                  </ProductsDetails.Description>
                  <ProductsDetails.Price price={productSelected.price} />
                </ProductsDetails.Content>

                <div className="border border-border" />

                <div className="flex flex-col gap-2">
                  <button
                    className="flex w-full cursor-pointer gap-4 rounded-2xl p-3 hover:bg-slate-100"
                    onClick={handleOpenEditProduct}
                  >
                    <Pencil />
                    <Typography variant="body">Editar Produto</Typography>
                  </button>

                  <button
                    className="flex w-full cursor-pointer gap-4 rounded-2xl p-3 hover:bg-slate-100"
                    onClick={handleOpenDeleteProduct}
                  >
                    <Trash2 className="text-danger" />
                    <Typography variant="body" color="danger">
                      Deletar Produto
                    </Typography>
                  </button>
                </div>
              </ProductsDetails.Root>
            </div>
          </>
        )}

        <ModalDetailsProduct
          open={isEditModalOpen}
          product={productSelected}
          onClose={handleCloseEditProduct}
          onSubmitProduct={handleSubmitProduct}
        />

        <ModalConfirmation
          open={isDeleteModalOpen}
          title="Deletar produto"
          description={
            productSelected
              ? `Tem certeza que deseja deletar ${productSelected.title}?`
              : undefined
          }
          onConfirm={handleDeleteProduct}
          onCancel={handleCloseDeleteProduct}
          labelConfirm="Deletar"
          labelCancel="Cancelar"
        />
      </div>
    </Container>
  );
}
