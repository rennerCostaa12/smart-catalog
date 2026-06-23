type ProductsItemsRequest = {
  subtotal: number;
  productId: number;
  quantity: number;
  unitPrice: number;
};

export enum StatusOrderNameEnum {
  PENDENTE = "PENDENTE",
  CONFIRMADO = "CONFIRMADO",
  PREPARANDO = "PREPARANDO",
  PRONTO_PARA_ENTREGA = "PRONTO PARA ENTREGA",
  PRONTO_PARA_RETIRADA = "PRONTO PARA RETIRADA",
  ENTREGUE = "ENTREGUE",
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
