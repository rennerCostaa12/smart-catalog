import type { ICardPaymentValues } from "../../../components/CartButton/components/MethodPayment/types";
import { DeliveryMethodEnum } from "../../../components/CartButton/components/DeliveryMethod/types";
import { MethodPaymentEnum } from "../../../components/CartButton/components/MethodPayment/types";
import type { CartFormData } from "./types";

export const initialCardValues: ICardPaymentValues = {
  cardHolderName: "",
  cardNumber: "",
  expirationMonth: "",
  expirationYear: "",
  cvv: "",
  holderName: "",
  holderEmail: "",
  holderDocument: "",
  holderZipCode: "",
  holderAddressNumber: "",
  holderPhone: "",
};

export const initialCartFormValues: CartFormData = {
  deliveryMethod: DeliveryMethodEnum.DELIVERY,
  addressValue: "",
  receiverNameValue: "",
  documentValue: "",
  methodPayment: MethodPaymentEnum.CARD,
  ...initialCardValues,
};
