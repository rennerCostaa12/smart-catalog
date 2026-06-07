import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router";

import { DeliveryMethod } from "../../../components/CartButton/components/DeliveryMethod";
import { MethodPayment } from "../../../components/CartButton/components/MethodPayment";
import { Button } from "../../../components/ui/button";
import { Typography } from "../../../components/ui/typography";
import { ThemeColors } from "../../../constants/themeColors";
import { brlFormatter } from "../../../utils/brlFormatter";
import { WhatsAppIcon } from "../../../components/WhatsAppIcon";
import { useCart } from "./useCart";

export function CartsPage() {
  const {
    cart,
    totalItems,
    totalPrice,
    control,
    hasFormError,
    handleDecreaseProductQuantity,
    handleIncreaseProductQuantity,
    handleRemoveProduct,
    handleBuyWpp,
  } = useCart();

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-2">
        <Typography variant="h1">Carrinhos</Typography>
        <Typography variant="body" color="muted">
          Confira os itens selecionados para o seu pedido
        </Typography>
      </div>

      {cart.length === 0 ? (
        <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-soft p-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-surface text-primary shadow-sm">
            <ShoppingBag size={26} />
          </div>

          <Typography className="mt-4" weight="bold">
            Seu carrinho esta vazio
          </Typography>

          <Typography
            className="mt-2 max-w-md"
            variant="bodySmall"
            color="muted"
          >
            Adicione produtos do catalogo para visualizar os itens aqui.
          </Typography>

          <Button className="mt-6" type="button">
            <Link to="/produtos/listar-produtos">Ver catalogo</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="flex flex-col gap-4">
            <div className="space-y-3">
              {cart.map((product) => (
                <div
                  key={product.title}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-soft p-3 sm:flex-row sm:items-center"
                >
                  <img
                    src={product.url_img}
                    alt={product.title}
                    className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-24"
                  />

                  <div className="min-w-0 flex-1">
                    <Typography className="line-clamp-2" weight="medium">
                      {product.title}
                    </Typography>

                    <Typography variant="bodySmall" color="muted">
                      Unitario: {brlFormatter.format(product.price)}
                    </Typography>

                    <Typography
                      variant="bodySmall"
                      weight="bold"
                      color="primary"
                    >
                      {brlFormatter.format(product.price * product.quantity)}
                    </Typography>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() =>
                          handleDecreaseProductQuantity(product.title)
                        }
                        title="Diminuir quantidade"
                      >
                        <Minus size={16} />
                      </Button>

                      <Typography weight="bold" variant="caption">
                        {product.quantity}
                      </Typography>

                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => handleIncreaseProductQuantity(product)}
                        title="Aumentar quantidade"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>

                    <Button
                      title="Remover produto"
                      variant="outline"
                      className="cursor-pointer text-danger hover:border-red-200 hover:bg-red-50 hover:text-danger"
                      onClick={() => handleRemoveProduct(product.title)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <DeliveryMethod control={control} />
            <MethodPayment control={control} />
          </div>

          <aside className="flex h-fit flex-col gap-4">
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
              <Typography weight="bold">Resumo do carrinho</Typography>

              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between gap-4">
                  <Typography variant="bodySmall" color="muted">
                    Itens
                  </Typography>
                  <Typography variant="bodySmall" weight="bold">
                    {totalItems}
                  </Typography>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <Typography weight="bold">Total</Typography>
                  <Typography variant="price" color="primary">
                    {brlFormatter.format(totalPrice)}
                  </Typography>
                </div>
              </div>

              <Button
                title="Finalizar compra"
                className="mt-4 cursor-pointer"
                fullWidth
                variant="whatsapp"
                leftIcon={<WhatsAppIcon color={ThemeColors.white} />}
                onClick={handleBuyWpp}
                disabled={hasFormError}
              >
                Finalizar no WhatsApp
              </Button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
