import { DeliveryMethodEnum } from "../components/CartButton/components/DeliveryMethod/types";
import { MethodPaymentEnum } from "../components/CartButton/components/MethodPayment/types";
import {
  DeliveryMethodEnum as OrderDeliveryMethodEnum,
  MethodPaymentIDEnum,
} from "../services/orders/types";

export function getOrderMethodPayment(methodPayment: MethodPaymentEnum) {
  return methodPayment === MethodPaymentEnum.CARD
    ? MethodPaymentIDEnum.CARD
    : MethodPaymentIDEnum.PIX;
}

export function getOrderDeliveryMethod(deliveryMethod: DeliveryMethodEnum) {
  return deliveryMethod === DeliveryMethodEnum.DELIVERY
    ? OrderDeliveryMethodEnum.DELIVERY
    : OrderDeliveryMethodEnum.PICKUP;
}
