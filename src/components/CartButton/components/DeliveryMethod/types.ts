import type { Control } from "react-hook-form";
import type { CartFormData } from "../../../../pages/products/Carts/types";

export enum DeliveryMethodEnum {
  DELIVERY = "entrega",
  PICKUP = "retirar",
}
export interface IDeliveryMethodProps {
  className?: string;
  control: Control<CartFormData, any, CartFormData>;
}
