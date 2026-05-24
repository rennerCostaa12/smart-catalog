import { ShoppingCart, X } from "lucide-react";
import { brlFormatter } from "../../utils/brlFormatter";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import type { IProductsDetailsProps } from "./types";

export function ProductsDetails({
  url_img,
  category,
  name,
  price,
  className,
  onAddToCart,
  closeProductDetails,
}: IProductsDetailsProps) {
  return (
    <section
      className={`relative flex flex-col gap-4 rounded-2xl max-lg:rounded-b-none border border-border bg-surface p-6 shadow-sm ${className || ""}`}
    >
      {closeProductDetails && (
        <button
          type="button"
          aria-label="Fechar detalhes do produto"
          onClick={closeProductDetails}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/90 text-text shadow-sm transition hover:border-primary-light hover:bg-primary-light hover:text-primary-dark cursor-pointer"
        >
          <X size={18} />
        </button>
      )}

      <div className="overflow-hidden rounded-[1.25rem] bg-surface-soft">
        <img
          src={url_img}
          alt={name}
          className="aspect-square w-full object-cover max-lg:h-[250px]"
        />
      </div>

      <Typography
        variant="bodySmall"
        color="primary"
        className="uppercase tracking-[0.2em]"
      >
        {category}
      </Typography>

      <Typography variant="h2">{name}</Typography>

      <Typography variant="price" color="primary">
        {brlFormatter.format(price)}
      </Typography>

      <Button
        type="button"
        leftIcon={<ShoppingCart size={18} />}
        onClick={onAddToCart}
        className="mt-2 cursor-pointer"
      >
        Adicionar no carrinho
      </Button>
    </section>
  );
}
