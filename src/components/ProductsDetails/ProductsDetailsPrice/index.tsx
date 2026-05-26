import { brlFormatter } from "../../../utils/brlFormatter";
import { Typography } from "../../ui/typography";
import type { IProductsDetailsPriceProps } from "./types";

export function ProductsDetailsPrice({
  price,
  className,
}: IProductsDetailsPriceProps) {
  return (
    <Typography variant="price" color="primary" className={className}>
      {brlFormatter.format(price)}
    </Typography>
  );
}
