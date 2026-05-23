import { X } from "lucide-react";
import { brlFormatter } from "../../../../utils/brlFormatter";
import { Button } from "../../../ui/button";
import { Typography } from "../../../ui/typography";

import { type IModalListItemsProps } from "./types";
import { WhatsAppIcon } from "../../../WhatsAppIcon";
import { colors } from "../../../../constants/themeColors";
import { useModalListItems } from "./useModalListItems";
import { ItemCart } from "../ItemCart";

export function ModalListItems({ closeModal }: IModalListItemsProps) {
  const {
    handleDecreaseCart,
    handleIncreaseCart,
    handleRemoveProductCart,
    totalPrice,
    items,
    handleBuyWpp,
  } = useModalListItems();

  return (
    <div className="absolute right-0 z-50 mt-2 w-[min(92vw,32rem)] rounded-2xl border border-border bg-white px-4 py-4 shadow-2xl">
      <div className="flex justify-between items-center">
        <div>
          <Typography weight="bold">Itens Selecionados</Typography>
        </div>

        <div>
          <Button
            variant="outline"
            onClick={closeModal}
            className="cursor-pointer"
          >
            <X size={20} />
          </Button>
        </div>
      </div>

      <div className="mt-4 max-h-80 space-y-3 overflow-y-auto pr-1">
        {items.length === 0 && (
          <div className="rounded-2xl bg-surface-soft px-4 py-6 text-center">
            <Typography weight="medium">Seu carrinho esta vazio</Typography>
            <Typography variant="bodySmall" color="muted">
              Adicione produtos para visualizar os itens aqui.
            </Typography>
          </div>
        )}

        {items.map((product) => (
          <ItemCart
            key={product.title}
            handleDecreaseCart={handleDecreaseCart}
            handleIncreaseCart={handleIncreaseCart}
            handleRemoveProductCart={handleRemoveProductCart}
            product={product}
          />
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <Typography weight="bold">Total</Typography>
          <Typography variant="price" color="primary">
            {brlFormatter.format(totalPrice)}
          </Typography>
        </div>

        <Button
          title="Finalizar compra"
          className="mt-4 cursor-pointer"
          fullWidth
          variant="whatsapp"
          leftIcon={<WhatsAppIcon color={colors.white} />}
          onClick={handleBuyWpp}
        >
          Finalizar WhatsApp
        </Button>
      </div>
    </div>
  );
}
