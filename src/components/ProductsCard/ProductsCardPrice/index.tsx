import { brlFormatter } from "../../../utils/brlFormatter";
import { Typography } from "../../ui/typography";
import type { IProductsCardPriceProps } from "./types";

export function ProductsCardPrice({
  price,
  className,
}: IProductsCardPriceProps) {
  return (
    <Typography variant="price" color="primary" className={className}>
      {brlFormatter.format(price)}
    </Typography>
  );
}
