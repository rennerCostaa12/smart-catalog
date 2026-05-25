import { ProductsCardButton } from "./ProductsCardButton";
import { ProductsCardContent } from "./ProductsCardContent";
import { ProductsCardFooter } from "./ProductsCardFooter";
import { ProductsCardIcon } from "./ProductsCardIcon";
import { ProductsCardImage } from "./ProductsCardImage";
import { ProductsCardPrice } from "./ProductsCardPrice";
import { ProductsCardRoot } from "./ProductsCardRoot";
import { ProductsCardTitle } from "./ProductsCardTitle";
import type { IProductsCardType } from "./types";

export {
  ProductsCardButton,
  ProductsCardContent,
  ProductsCardFooter,
  ProductsCardIcon,
  ProductsCardImage,
  ProductsCardPrice,
  ProductsCardRoot,
  ProductsCardTitle,
};

export const ProductsCard: IProductsCardType = {
  Root: ProductsCardRoot,
  Button: ProductsCardButton,
  Image: ProductsCardImage,
  Content: ProductsCardContent,
  Title: ProductsCardTitle,
  Footer: ProductsCardFooter,
  Price: ProductsCardPrice,
  Icon: ProductsCardIcon,
};
