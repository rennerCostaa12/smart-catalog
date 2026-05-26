export enum MethodPaymentEnum {
  MONEY = "dinheiro",
  CARD = "cartao"
}

export interface IMethodPaymentProps {
  className?: string;
  value: MethodPaymentEnum;
  onValueChange: (value: MethodPaymentEnum) => void;
  cashChangeValue: string;
  onCashChangeValue: (value: string) => void;
  cashChangeError?: string;
}
