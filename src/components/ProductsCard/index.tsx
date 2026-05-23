import { ChevronRight } from "lucide-react";
import { brlFormatter } from "../../utils/brlFormatter";
import { Typography } from "../ui/typography";
import type { IProductsCardProps } from "./types";

export function ProductsCard({
  url_img,
  title,
  price,
  className,
  onClick
}: IProductsCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-sm ${className}`}
      onClick={onClick}
    >
      <div className="aspect-square w-full bg-surface-soft">
        <img src={url_img} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2 p-5">
        <Typography className="line-clamp-2">{title}</Typography>

        <div className="flex justify-between items-center">
          <Typography variant="price" color="primary">
            {brlFormatter.format(price)}
          </Typography>

          <ChevronRight size={40} className="text-primary" />
        </div>
      </div>
    </article>
  );
}
