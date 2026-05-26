import { Controller } from "react-hook-form";
import { Modal } from "../../../../../components/Modal";
import { ProductsDetails } from "../../../../../components/ProductsDetails";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Typography } from "../../../../../components/ui/typography";
import type { IModalDetailsProductProps } from "./types";
import { useModalDetailsProduct } from "./useModalDetailsProduct";
import { InputFile } from "../../../../../components/InputFile";

export function ModalDetailsProduct({
  open,
  product,
  onClose,
  onSubmitProduct,
}: IModalDetailsProductProps) {
  const { control, errors, isSubmitting, previewImage, handleSubmitProduct } =
    useModalDetailsProduct({
      product,
      onClose,
      onSubmitProduct,
    });

  if (!product) {
    return null;
  }

  return (
    <Modal.Root open={open}>
      <Modal.Overlay onClick={onClose} />

      <Modal.Content className="p-4">
        <div className="relative w-full max-w-xl">
          <ProductsDetails.Root className="max-h-[90vh] overflow-y-auto">
            <Typography variant="h4">Editar produto</Typography>
            <ProductsDetails.CloseButton onClick={onClose} />
            <ProductsDetails.Image src={previewImage} alt={product.title} />
            <form onSubmit={handleSubmitProduct}>
              <ProductsDetails.Content className="gap-5">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Nome do produto"
                      placeholder="Digite o nome do produto"
                      error={errors.title?.message}
                    />
                  )}
                />

                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange, name, ref } }) => (
                    <InputFile
                      name={name}
                      ref={ref}
                      label="Imagem do produto"
                      accept="image/png, image/jpeg"
                      error={errors.image?.message}
                      onChange={(event) => {
                        onChange(event.target.files);
                      }}
                    />
                  )}
                />

                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Quantidade em estoque"
                      type="number"
                      min={0}
                      placeholder="0"
                      error={errors.stock?.message}
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  )}
                />

                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Preco"
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="0.00"
                      error={errors.price?.message}
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  )}
                />

                <div className="flex flex-col gap-3 pt-2 sm:flex-row justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>

                  <Button
                    type="submit"
                    className="cursor-pointer"
                    isLoading={isSubmitting}
                    variant="secondary"
                  >
                    Salvar alteracoes
                  </Button>
                </div>
              </ProductsDetails.Content>
            </form>
          </ProductsDetails.Root>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
