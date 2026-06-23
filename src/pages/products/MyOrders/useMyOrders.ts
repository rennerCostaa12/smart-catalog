import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { ROUTE_SEGMENTS } from "../../../../app/constants";
import { readAuthSessionCookie } from "../../../context/auth/sessionCookie";
import { useAuth } from "../../../context/auth/useAuth";
import { ordersService } from "../../../services/orders";
import { brlFormatter } from "../../../utils/brlFormatter";
import type { OrderProps } from "./components/OrderCard/types";
import type { OrdersResponse } from "../../../services/orders/types";
import { formatOrderDate } from "../../../utils/dates";

import { OrderStatusEnum } from "../../../components/StatusBadge/types";

function mapOrder(order: OrdersResponse): OrderProps {
  return {
    id: `#${order?.id}`,
    date: formatOrderDate(order?.createdAt),
    status: OrderStatusEnum.Processing,
    total: brlFormatter.format(order?.total),
    items: (order?.items ?? []).map((item) => ({
      name:
        item.product?.name ??
        item.product?.title ??
        `Produto #${item.productId}`,
      quantity: item.quantity,
      unitPrice: brlFormatter.format(item.unitPrice),
      subtotal: brlFormatter.format(item.subtotal),
      image: item.product?.imageUrl ?? item.product?.image,
    })),
  };
}

export function useMyOrders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const sessionUser = user ?? readAuthSessionCookie();
  const userId = sessionUser?.id.toString();

  const [orderSelected, setOrderSelected] = useState<OrderProps | null>(null);

  const {
    data: orders = [],
    error,
    isFetching,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["orders", "list", userId],
    queryFn: () => ordersService.listOrders(userId!, sessionUser?.token),
    enabled: Boolean(userId),
    select: (orders) => orders?.data?.map(mapOrder),
  });

  const handleCloseModal = () => {
    setOrderSelected(null);
  };

  useEffect(() => {
    if (!user && !readAuthSessionCookie()) {
      navigate(`../${ROUTE_SEGMENTS.products.listProducts}?categoria=todos`, {
        replace: true,
      });
    }
  }, [navigate, user]);

  return {
    orders,
    error,
    isFetching,
    isPending,
    refetch,
    hasOrders: orders.length > 0,
    orderSelected,
    handleCloseModal,
    setOrderSelected,
  };
}
