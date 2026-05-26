import { ProductsDetailsButton } from "./ProductsDetailsButton";
import { ProductsDetailsCategory } from "./ProductsDetailsCategory";
import { ProductsDetailsCloseButton } from "./ProductsDetailsCloseButton";
import { ProductsDetailsContent } from "./ProductsDetailsContent";
import { ProductsDetailsDescription } from "./ProductsDetailsDescription";
import { ProductsDetailsImage } from "./ProductsDetailsImage";
import { ProductsDetailsPrice } from "./ProductsDetailsPrice";
import { ProductsDetailsRoot } from "./ProductsDetailsRoot";
import { ProductsDetailsTitle } from "./ProductsDetailsTitle";
import type { IProductsDetailsType } from "./types";

export {
  ProductsDetailsButton,
  ProductsDetailsCategory,
  ProductsDetailsCloseButton,
  ProductsDetailsContent,
  ProductsDetailsDescription,
  ProductsDetailsImage,
  ProductsDetailsPrice,
  ProductsDetailsRoot,
  ProductsDetailsTitle,
};

export const ProductsDetails: IProductsDetailsType = {
  Root: ProductsDetailsRoot,
  Image: ProductsDetailsImage,
  Content: ProductsDetailsContent,
  Category: ProductsDetailsCategory,
  Title: ProductsDetailsTitle,
  Description: ProductsDetailsDescription,
  Price: ProductsDetailsPrice,
  Button: ProductsDetailsButton,
  CloseButton: ProductsDetailsCloseButton,
};
