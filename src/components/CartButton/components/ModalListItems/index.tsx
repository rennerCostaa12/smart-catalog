import { X } from "lucide-react";
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
    handleDecreaseCart,
    handleIncreaseCart,
    handleRemoveProductCart,
    totalPrice,
    items,
    handleBuyWpp,
    isSubmitting,
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
            <DeliveryMethod control={control} className="mb-4" />
            <MethodPayment control={control} />
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
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Finalizar no WhatsApp
          </Button>
        )}
      </div>
    </div>
  );
}
