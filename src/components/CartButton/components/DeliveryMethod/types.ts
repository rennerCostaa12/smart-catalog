export enum DeliveryMethodEnum {
  DELIVERY = "entrega",
  PICKUP = "retirar",
}

export interface IDeliveryMethodProps {
  className?: string;
  value: DeliveryMethodEnum;
  onValueChange: (value: DeliveryMethodEnum) => void;
  addressValue: string;
  onAddressChange: (value: string) => void;
  receiverNameValue: string;
  onReceiverNameChange: (value: string) => void;
  addressError?: string;
  receiverNameError?: string;
}
