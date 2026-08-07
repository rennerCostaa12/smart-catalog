import { queryOptions } from "@tanstack/react-query";

import { ordersService } from ".";

export const ordersQueryKeys = {
  all: ["orders"],
  getOrderById: (userId: string, orderId: string) => [
    ...ordersQueryKeys.all,
    "orderById",
    userId,
    orderId,
  ],
};

export function ordersGetByIdQueryOptions(userId: string, orderId: string) {
  return queryOptions({
    queryKey: ordersQueryKeys.getOrderById(userId, orderId),
    queryFn: () => ordersService.getOrderById(userId, orderId),
    enabled: Boolean(userId) && Boolean(orderId),
  });
}
