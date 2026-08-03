import { StatusOrderNameEnum, type OrderStatus, type OrderStatusColor } from "./types";

export const orderStatusColor = {
  [StatusOrderNameEnum.PENDENTE]: {
    className: "border-warning/20 bg-warning/10 before:bg-warning",
    color: "warning",
  },
  [StatusOrderNameEnum.CONFIRMADO]: {
    className: "border-primary/20 bg-primary-light before:bg-primary",
    color: "primary",
  },
  [StatusOrderNameEnum.PREPARANDO]: {
    className: "border-primary/20 bg-primary-light before:bg-primary",
    color: "primary",
  },
  [StatusOrderNameEnum.PRONTO_PARA_ENTREGA]: {
    className: "border-secondary/20 bg-secondary-light before:bg-success",
    color: "success",
  },
  [StatusOrderNameEnum.PRONTO_PARA_RETIRADA]: {
    className: "border-secondary/20 bg-secondary-light before:bg-success",
    color: "success",
  },
  [StatusOrderNameEnum.ENTREGUE]: {
    className: "border-border bg-surface-soft before:bg-text-muted",
    color: "muted",
  },
} satisfies Record<OrderStatus, OrderStatusColor>;
