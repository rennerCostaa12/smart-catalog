import type { OrderStatus } from "../../../../../components/StatusBadge/types";

export type ProductItem = {
  name: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
  image?: string;
};

export type OrderProps = {
  id: string;
  date: string;
  status: OrderStatus;
  total: string;
  methodPayment: string;
  deliveryMethod: string;
  items: ProductItem[];
};

export interface IOrderCardProps {
  order: OrderProps;
  onDetails: (order: OrderProps) => void;
}
