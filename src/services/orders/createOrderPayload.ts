import type { ICartItem } from "../../context/cart/types";
import type { CreateOrdersRequest } from "./types";
import { StatusOrderIDEnum } from "./types";

export function createOrderPayload(
  cart: ICartItem[],
  catalogClientId: number,
  total: number,
): CreateOrdersRequest {
  return {
    catalogClientId,
    total,
    statusOrderId: StatusOrderIDEnum.PENDING,
    items: cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.value,
      subtotal: item.value * item.quantity,
    })),
  };
}
