export enum OrderStatusEnum {
  Delivered = "Entregue",
  InTransit = "Em transporte",
  Processing = "Processando",
  Canceled = "Cancelado",
}

export type OrderStatus = `${OrderStatusEnum}`;

export interface IStatusBadgeProps {
  status: OrderStatus;
}
