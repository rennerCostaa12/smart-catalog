import type { Control } from "react-hook-form";
import type { CartFormData } from "../../../../pages/products/Carts/types";

export enum MethodPaymentEnum {
  PIX = "pix",
  CARD = "cartao",
}

export interface ICardPaymentValues {
  cardHolderName: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  holderName: string;
  holderEmail: string;
  holderDocument: string;
  holderZipCode: string;
  holderAddressNumber: string;
  holderPhone: string;
}

export type ICardPaymentErrors = Partial<
  Record<keyof ICardPaymentValues, string>
>;

export interface IMethodPaymentProps {
  className?: string;
  control: Control<CartFormData, any, CartFormData>;
}
