import type { ICartItem } from "../../context/cart/types";
import {
  DeliveryMethodEnum,
  StatusOrderIDEnum,
  type CreateOrdersRequest,
  type MethodPaymentIDEnum,
} from "./types";

export function createOrderPayload(
  cart: ICartItem[],
  catalogClientId: number,
  total: number,
  methodPayment: MethodPaymentIDEnum,
  methodDelivery: DeliveryMethodEnum,
): CreateOrdersRequest {
  return {
    catalogClientId,
    total,
    statusOrderId: StatusOrderIDEnum.PENDING,
    deliveryMethod: methodDelivery,
    methodPaymentId: methodPayment,
    items: cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.value,
      subtotal: item.value * item.quantity,
    })),
  };
}
