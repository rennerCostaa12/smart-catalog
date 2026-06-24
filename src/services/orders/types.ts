type ProductsItemsRequest = {
  subtotal: number;
  productId: number;
  quantity: number;
  unitPrice: number;
};

export enum StatusOrderNameEnum {
  PENDING = "PENDENTE",
  CONFIRMED = "CONFIRMADO",
  PREPARING = "PREPARANDO",
  READY_FOR_DELIVERY = "PRONTO PARA ENTREGA",
  READY_FOR_PICKUP = "PRONTO PARA RETIRADA",
  DELIVERED = "ENTREGUE",
}

export enum StatusOrderIDEnum {
  PENDING = 1,
  CONFIRMED = 2,
  PREPARING = 3,
  READY_FOR_DELIVERY = 4,
  READY_FOR_PICKUP = 5,
  DELIVERED = 6,
}

export type ProductsItemsResponse = {
  id: string;
  orderId: string;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product?: {
    id: number;
    name?: string;
    title?: string;
    imageUrl?: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
};

type ProductItem = {
  name: string;
  description: string | null;
  value: number;
  imageUrl: string | null;
  catalogClient: {
    name: string;
    description: string | null;
  };
  category: {
    name: string;
    description: string | null;
  };
};

type OrdersItems = {
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product: ProductItem;
};

export type OrdersResponse = {
  id: string;
  userId: number;
  catalogClientId: number;
  total: number;
  statusOrderId: number;
  items?: ProductsItemsResponse[];
  createdAt: string;
  updatedAt: string;
};

export interface CreateOrdersRequest {
  catalogClientId: number;
  total: number;
  statusOrderId: number;
  items: ProductsItemsRequest[];
}

export interface CreateOrdersResponse {
  id: string;
  userId: number;
  catalogClientId: number;
  total: number;
  statusOrderId: number;
  statusOrder: {
    name: StatusOrderNameEnum;
  };
  items: OrdersItems[];
  createdAt: string;
  updatedAt: string;
}

export interface ListOrdersResponse {
  data: OrdersResponse[];
}
