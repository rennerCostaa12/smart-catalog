import type { StatusOrderNameEnum } from "../../services/orders/types";
import type { TypographyColor } from "../ui/typography/types";

export { StatusOrderNameEnum } from "../../services/orders/types";

export type OrderStatus = `${StatusOrderNameEnum}`;

export interface IStatusBadgeProps {
  status: OrderStatus;
}

export type OrderStatusColor = {
  className: string;
  color: TypographyColor;
};
