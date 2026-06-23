import type { OrderStatus } from "./types";

export const statusStyles: Record<OrderStatus, string> = {
  Entregue: "border-green-200 bg-green-50 text-green-700 before:bg-green-500",
  "Em transporte":
    "border-blue-200 bg-blue-50 text-blue-700 before:bg-blue-500",
  Processando:
    "border-orange-200 bg-orange-50 text-orange-700 before:bg-orange-500",
  Cancelado: "border-red-200 bg-red-50 text-red-700 before:bg-red-500",
};
