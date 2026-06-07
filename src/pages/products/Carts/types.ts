import type { DeliveryMethodEnum } from "../../../components/CartButton/components/DeliveryMethod/types";
import type {
  ICardPaymentValues,
  MethodPaymentEnum,
} from "../../../components/CartButton/components/MethodPayment/types";

export type CartFormData = ICardPaymentValues & {
  deliveryMethod: DeliveryMethodEnum;
  addressValue: string;
  receiverNameValue: string;
  documentValue: string;
  methodPayment: MethodPaymentEnum;
};
