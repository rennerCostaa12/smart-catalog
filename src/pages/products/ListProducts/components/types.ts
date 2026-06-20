import type { ProductsProps } from "../../../../services";


export interface IListProductsProps {
  isPending?: boolean;
  error?: Error | null;
  items: ProductsProps[];
  handleSelectItem: (product: ProductsProps) => void;
}
