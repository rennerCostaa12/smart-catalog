import type { IProductsCardButtonProps } from "./ProductsCardButton/types";
import type { IProductsCardContentProps } from "./ProductsCardContent/types";
import type { IProductsCardFooterProps } from "./ProductsCardFooter/types";
import type { IProductsCardIconProps } from "./ProductsCardIcon/types";
import type { IProductsCardImageProps } from "./ProductsCardImage/types";
import type { IProductsCardPriceProps } from "./ProductsCardPrice/types";
import type { IProductsCardRootProps } from "./ProductsCardRoot/types";
import type { IProductsCardTitleProps } from "./ProductsCardTitle/types";

export type {
  IProductsCardButtonProps,
  IProductsCardContentProps,
  IProductsCardFooterProps,
  IProductsCardIconProps,
  IProductsCardImageProps,
  IProductsCardPriceProps,
  IProductsCardRootProps,
  IProductsCardTitleProps,
};

export interface IProductsCardType {
  Root: (props: IProductsCardRootProps) => React.JSX.Element;
  Button: (props: IProductsCardButtonProps) => React.JSX.Element;
  Image: (props: IProductsCardImageProps) => React.JSX.Element;
  Content: (props: IProductsCardContentProps) => React.JSX.Element;
  Title: (props: IProductsCardTitleProps) => React.JSX.Element;
  Footer: (props: IProductsCardFooterProps) => React.JSX.Element;
  Price: (props: IProductsCardPriceProps) => React.JSX.Element;
  Icon: (props: IProductsCardIconProps) => React.JSX.Element;
}
