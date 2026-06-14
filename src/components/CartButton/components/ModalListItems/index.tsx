import { X } from "lucide-react";
import { Controller } from "react-hook-form";
import { brlFormatter } from "../../../../utils/brlFormatter";
import { Button } from "../../../ui/button";
import { Typography } from "../../../ui/typography";

import { type IModalListItemsProps } from "./types";
import { WhatsAppIcon } from "../../../WhatsAppIcon";
import { ThemeColors } from "../../../../constants/themeColors";
import { useModalListItems } from "./useModalListItems";
import { ItemCart } from "../ItemCart";
import { ItemCartMobile } from "../ItemCartMobile";
import { MethodPayment } from "../MethodPayment";
import { DeliveryMethod } from "../DeliveryMethod";

export function ModalListItems({ closeModal }: IModalListItemsProps) {
  const {
    control,
    errors,
    cardValues,
    cardErrors,
    handleDecreaseCart,
    handleIncreaseCart,
    handleRemoveProductCart,
    totalPrice,
    items,
    handleBuyWpp,
    handleCardValueChange,
  } = useModalListItems();

  return (
    <div className="absolute right-5 z-50 w-[min(92vw,32rem)] max-md:w-[95vw] top-8 max-md:top-0 max-md:right-[-100%] rounded-2xl border border-border bg-white px-4 py-4 shadow-2xl">
      <div className="flex justify-between items-center">
        <div>
          <Typography weight="bold">Itens Selecionados</Typography>
        </div>

        <div>
          <Button
            variant="outline"
            onClick={closeModal}
            className="cursor-pointer"
            size="sm"
          >
            <X size={20} />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1 lg:max-h-80 max-lg:max-h-72 lg:flex-none">
        {items.length === 0 && (
          <div className="rounded-2xl bg-surface-soft px-4 py-6 text-center">
            <Typography weight="medium">Seu carrinho esta vazio</Typography>
            <Typography variant="bodySmall" color="muted">
              Adicione produtos para visualizar os itens aqui.
            </Typography>
          </div>
        )}

        {items.map((product) => (
          <div key={product.id}>
            <div className="md:hidden">
              <ItemCartMobile
                handleDecreaseCart={handleDecreaseCart}
                handleIncreaseCart={handleIncreaseCart}
                handleRemoveProductCart={handleRemoveProductCart}
                product={product}
              />
            </div>

            <div className="hidden md:block">
              <ItemCart
                handleDecreaseCart={handleDecreaseCart}
                handleIncreaseCart={handleIncreaseCart}
                handleRemoveProductCart={handleRemoveProductCart}
                product={product}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-4 flex flex-col gap-4">
        {items?.length > 0 && (
          <div>
            <Controller
              name="deliveryMethod"
              control={control}
              render={({ field: deliveryMethodField }) => (
                <Controller
                  name="addressValue"
                  control={control}
                  render={({ field: addressField }) => (
                    <Controller
                      name="receiverNameValue"
                      control={control}
                      render={({ field: receiverNameField }) => (
                        <Controller
                          name="documentValue"
                          control={control}
                          render={({ field: documentField }) => (
                            <DeliveryMethod
                              value={deliveryMethodField.value}
                              onValueChange={deliveryMethodField.onChange}
                              addressValue={addressField.value ?? ""}
                              onAddressChange={addressField.onChange}
                              receiverNameValue={receiverNameField.value ?? ""}
                              onReceiverNameChange={receiverNameField.onChange}
                              documentValue={documentField.value ?? ""}
                              onDocumentChange={documentField.onChange}
                              addressError={errors.addressValue?.message}
                              receiverNameError={
                                errors.receiverNameValue?.message
                              }
                              documentError={errors.documentValue?.message}
                              className="mb-4"
                            />
                          )}
                        />
                      )}
                    />
                  )}
                />
              )}
            />

            <Controller
              name="methodPayment"
              control={control}
              render={({ field: methodPaymentField }) => (
                <MethodPayment
                  value={methodPaymentField.value}
                  onValueChange={methodPaymentField.onChange}
                  cardValues={cardValues}
                  cardErrors={cardErrors}
                  onCardValueChange={handleCardValueChange}
                />
              )}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Typography weight="bold">Total</Typography>
          <Typography variant="price" color="primary">
            {brlFormatter.format(totalPrice)}
          </Typography>
        </div>

        {items?.length > 0 && (
          <Button
            title="Finalizar compra"
            className="mt-4 cursor-pointer"
            fullWidth
            variant="whatsapp"
            leftIcon={<WhatsAppIcon color={ThemeColors.white} />}
            onClick={handleBuyWpp}
          >
            Finalizar no WhatsApp
          </Button>
        )}
      </div>
    </div>
  );
}
