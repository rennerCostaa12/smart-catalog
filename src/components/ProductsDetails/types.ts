import type { IProductsDetailsButtonProps } from "./ProductsDetailsButton/types";
import type { IProductsDetailsCategoryProps } from "./ProductsDetailsCategory/types";
import type { IProductsDetailsCloseButtonProps } from "./ProductsDetailsCloseButton/types";
import type { IProductsDetailsContentProps } from "./ProductsDetailsContent/types";
import type { IProductsDetailsDescriptionProps } from "./ProductsDetailsDescription/types";
import type { IProductsDetailsImageProps } from "./ProductsDetailsImage/types";
import type { IProductsDetailsPriceProps } from "./ProductsDetailsPrice/types";
import type { IProductsDetailsRootProps } from "./ProductsDetailsRoot/types";
import type { IProductsDetailsTitleProps } from "./ProductsDetailsTitle/types";

export type {
  IProductsDetailsButtonProps,
  IProductsDetailsCategoryProps,
  IProductsDetailsCloseButtonProps,
  IProductsDetailsContentProps,
  IProductsDetailsDescriptionProps,
  IProductsDetailsImageProps,
  IProductsDetailsPriceProps,
  IProductsDetailsRootProps,
  IProductsDetailsTitleProps,
};

export interface IProductsDetailsType {
  Root: (props: IProductsDetailsRootProps) => React.JSX.Element;
  Image: (props: IProductsDetailsImageProps) => React.JSX.Element;
  Content: (props: IProductsDetailsContentProps) => React.JSX.Element;
  Category: (props: IProductsDetailsCategoryProps) => React.JSX.Element;
  Title: (props: IProductsDetailsTitleProps) => React.JSX.Element;
  Description: (props: IProductsDetailsDescriptionProps) => React.JSX.Element;
  Price: (props: IProductsDetailsPriceProps) => React.JSX.Element;
  Button: (props: IProductsDetailsButtonProps) => React.JSX.Element;
  CloseButton: (props: IProductsDetailsCloseButtonProps) => React.JSX.Element | null;
}
