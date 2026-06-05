export interface AsaasPaymentResponse {
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink?: string | null;
  value: number;
  netValue?: number;
  billingType: BillingTypeEnum;
  status: string;
  dueDate: string;
  invoiceUrl?: string;
  bankSlipUrl?: string | null;
  transactionReceiptUrl?: string | null;
  invoiceNumber?: string;
  externalReference?: string;
  creditCard?: {
    creditCardNumber?: string;
    creditCardBrand?: string;
    creditCardToken?: string;
  };
}

export type AsaasPixQrCodeResponse = {
  encodedImage: string;
  payload: string;
  expirationDate: string;
};

export enum BillingTypeEnum {
  PIX = "PIX",
  CREDIT_CARD = "CREDIT_CARD",
}
export interface AsaasCustomerRequest {
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink?: string | null;
  value: number;
  netValue?: number;
  billingType: BillingTypeEnum;
  status: string;
  dueDate: string;
  invoiceUrl?: string;
  bankSlipUrl?: string | null;
  transactionReceiptUrl?: string | null;
  invoiceNumber?: string;
  externalReference?: string;
  creditCard?: {
    creditCardNumber?: string;
    creditCardBrand?: string;
    creditCardToken?: string;
  };
}

export interface CreatePixPaymentRequest {
  customer?: string;
  userId: string | number;
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
  customerData?: AsaasCustomerRequest;
}

export type CreditCardDTO = {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
};

export type CreditCardHolderInfoDTO = {
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode: string;
  addressNumber: string;
  addressComplement?: string;
  phone: string;
  mobilePhone?: string;
};

export interface CreateCreditCardPaymentRequest {
  customer?: string;
  userId: string | number;
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
  customerData?: AsaasCustomerRequest;
  creditCard?: CreditCardDTO;
  creditCardHolderInfo?: CreditCardHolderInfoDTO;
  creditCardToken?: string;
  authorizeOnly?: boolean;
  remoteIp: string;
}

export type CreatePixPaymentResponse = AsaasPaymentResponse;
export type CreateCreditCardPaymentResponse = AsaasPaymentResponse;
export type GetPixQrCodeResponse = AsaasPixQrCodeResponse;
