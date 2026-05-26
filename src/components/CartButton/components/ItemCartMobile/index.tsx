import { Minus, Plus, Trash2 } from "lucide-react";
import { brlFormatter } from "../../../../utils/brlFormatter";
import { Button } from "../../../ui/button";
import { Typography } from "../../../ui/typography";
import type { IItemCartProps } from "../ItemCart/types";

export function ItemCartMobile({
  product,
  handleDecreaseCart,
  handleIncreaseCart,
  handleRemoveProductCart,
}: IItemCartProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface-soft p-3">
      <div className="flex items-start gap-3">
        <img
          src={product.url_img}
          alt={product.title}
          className="h-16 w-16 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {/* <Typography
                variant="caption"
                color="primary"
                className="uppercase tracking-[0.18em]"
              >
                {product.category}
              </Typography> */}

              <Typography
                variant="bodySmall"
                className="mt-1 line-clamp-2"
                weight="medium"
              >
                {product.title}
              </Typography>
            </div>

            <Button
              title="Deletar produto"
              variant="outline"
              className="shrink-0 cursor-pointer text-danger border-red-200 bg-red-50 hover:text-danger"
              onClick={() => handleRemoveProductCart(product.title)}
              size="sm"
            >
              <Trash2 size={16} className="text-danger" />
            </Button>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <div className="mt-2 flex items-center gap-2">
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => handleDecreaseCart(product.title)}
                  title="Diminuir quantidade"
                  size="sm"
                >
                  <Minus size={16} />
                </Button>
                <Typography weight="bold">{product.quantity}</Typography>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => handleIncreaseCart(product)}
                  title="Aumentar quantidade"
                  size="sm"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            <Typography variant="bodySmall" weight="bold" color="primary">
              {brlFormatter.format(product.price * product.quantity)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
