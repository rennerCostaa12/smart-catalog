import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import type { CartFormData } from "../../../../pages/products/Carts/types";

export enum DeliveryMethodEnum {
  DELIVERY = "entrega",
  PICKUP = "retirar",
}

type DeliveryMethodBaseProps = {
  className?: string;
};

type DeliveryMethodControlledProps<TFieldValues extends FieldValues> =
  DeliveryMethodBaseProps & {
    control: Control<TFieldValues>;
    errors?: FieldErrors<TFieldValues>;
    fieldNames?: {
      deliveryMethod: Path<TFieldValues>;
      addressValue: Path<TFieldValues>;
      receiverNameValue: Path<TFieldValues>;
      documentValue: Path<TFieldValues>;
    };
  };
export interface IDeliveryMethodProps {
  className?: string;
  control: Control<CartFormData, any, CartFormData>;
}
