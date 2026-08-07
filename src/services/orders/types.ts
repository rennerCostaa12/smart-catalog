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

export enum StatusOrderIDEnum {
  PENDING = 1,
  CONFIRMED = 2,
  PREPARING = 3,
  READY_FOR_DELIVERY = 4,
  READY_FOR_PICKUP = 5,
  DELIVERED = 6,
}

export enum MethodPaymentIDEnum {
  CARD = 1,
  PIX = 2,
}

export enum DeliveryMethodEnum {
  PICKUP = "RETIRADA",
  DELIVERY = "ENTREGA",
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
  id?: number;
  name: string;
  title?: string;
  description: string | null;
  value: number;
  imageUrl: string | null;
  image?: string;
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
  productId?: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product: ProductItem;
};

export type UserAddressItem = {
  label: string;
  address: string;
  neighborhood: string;
  complement: string | null;
  city: string;
  state: string;
  number: number;
  postalCode: string;
};

type MethodPaymentItem = {
  name: string;
  description: string | null;
};

export type OrderResponse = {
  id: string;
  userId: number;
  catalogClientId: number;
  total: number;
  statusOrderId: number;
  methodPaymentId: number;
  paymentId: number | null;
  deliveryMethod: DeliveryMethodEnum;
  userAddress?: UserAddressItem | null;
  methodPayment?: MethodPaymentItem | null;
  payment?: PaymentItem | null;
  statusOrder: {
    name: StatusOrderNameEnum;
  };
  items?: OrdersItems[];
  createdAt: string;
};

export interface CreateOrdersRequest {
  catalogClientId: number;
  total: number;
  statusOrderId: number;
  items: ProductsItemsRequest[];
  methodPaymentId: MethodPaymentIDEnum;
  deliveryMethod: DeliveryMethodEnum;
  paymentId?: number | null;
  userAddressId?: number | null;
}

export interface CreateOrdersResponse {
  data: {
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
  };
}

export interface ListOrdersResponse {
  data: OrderResponse[];
}

export interface GetOrderResponse {
  data: OrderResponse;
}
