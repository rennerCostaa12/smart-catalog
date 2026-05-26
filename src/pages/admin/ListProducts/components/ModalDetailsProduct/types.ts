import type { IProductsAdminProps } from "../../types";

export interface IModalDetailsProductFormData {
  title: string;
  image: FileList | null;
  stock: number;
  price: number;
}

export interface IModalDetailsProductProps {
  open: boolean;
  product: IProductsAdminProps | null;
  onClose: () => void;
  onSubmitProduct: (product: IProductsAdminProps) => void;
}
