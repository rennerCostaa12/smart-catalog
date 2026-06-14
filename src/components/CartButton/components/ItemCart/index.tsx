import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { Typography } from "../../../ui/typography";
import { brlFormatter } from "../../../../utils/brlFormatter";
import type { IItemCartProps } from "./types";

export function ItemCart({
  product,
  handleDecreaseCart,
  handleIncreaseCart,
  handleRemoveProductCart,
}: IItemCartProps) {
  return (
    <div
      key={product.id}
      className="relative flex items-start gap-3 rounded-2xl border border-border bg-surface-soft p-3"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-20 w-20 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        {/* <Typography
          variant="bodySmall"
          color="primary"
          className="uppercase tracking-[0.18em]"
        >
          {product.category}
        </Typography> */}

        <Typography className="mt-1 line-clamp-2" weight="medium">
          {product.value}
        </Typography>

        <div className="flex items-center max-sm:items-start justify-between gap-3 max-sm:flex-col">
          <div className="min-w-0">
            <Typography variant="bodySmall" color="muted">
              Unitario: {brlFormatter.format(product.value)}
            </Typography>
            <div className="mt-2 flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                onClick={() => handleDecreaseCart(product.id)}
                title="Adicionar produto"
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
                onClick={() => handleIncreaseCart(product)}
                title="Adicionar produto"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="flex items-center self-end gap-2 max-sm:self-start">
            <Typography variant="bodySmall" weight="bold" color="primary">
              {brlFormatter.format(product.value * product.quantity)}
            </Typography>

            <Button
              title="Deletar produto"
              variant="outline"
              className="absolute top-2 right-2 cursor-pointer text-danger hover:border-red-200 hover:bg-red-50 hover:text-danger"
              onClick={() => handleRemoveProductCart(product.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
