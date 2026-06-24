import { httpClient, HttpMethod, type HttpClient } from "../../http";
import type {
  CreateCreditCardPaymentRequest,
  CreateCreditCardPaymentResponse,
  CreatePixPaymentRequest,
  CreatePixPaymentResponse,
  GetPixQrCodeResponse,
} from "./types";

export class PaymentService {
  constructor(private readonly client: HttpClient = httpClient) {}

  async createPixPayment(data: CreatePixPaymentRequest) {
    const response = await this.client.request<
      CreatePixPaymentResponse,
      CreatePixPaymentRequest
    >({
      url: "/payments/pix",
      method: HttpMethod.Post,
      data,
    });

    return response.data;
  }

  async createCreditCardPayment(data: CreateCreditCardPaymentRequest) {
    const response = await this.client.request<
      CreateCreditCardPaymentResponse,
      CreateCreditCardPaymentRequest
    >({
      url: "/payments/credit-card",
      method: HttpMethod.Post,
      data,
    });

    return response.data;
  }

  async getPixQrCode(paymentId: string) {
    const response = await this.client.request<GetPixQrCodeResponse>({
      url: `/payments/pix/${paymentId}/qrcode`,
      method: HttpMethod.Get,
    });

    return response.data;
  }
}

export const paymentService = new PaymentService();

export type {
  CreateCreditCardPaymentRequest,
  CreateCreditCardPaymentResponse,
  CreatePixPaymentRequest,
  CreatePixPaymentResponse,
  GetPixQrCodeResponse,
};
