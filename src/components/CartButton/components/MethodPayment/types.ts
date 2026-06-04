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
  value: MethodPaymentEnum;
  onValueChange: (value: MethodPaymentEnum) => void;
  cardValues: ICardPaymentValues;
  cardErrors?: ICardPaymentErrors;
  onCardValueChange: (field: keyof ICardPaymentValues, value: string) => void;
}
