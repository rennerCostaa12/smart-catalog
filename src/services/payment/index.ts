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
    try {
      const response = await this.client.request<
        CreatePixPaymentResponse,
        CreatePixPaymentRequest
      >({
        url: "/pix",
        method: HttpMethod.Post,
        data,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async createCreditCardPayment(data: CreateCreditCardPaymentRequest) {
    try {
      const response = await this.client.request<
        CreateCreditCardPaymentResponse,
        CreateCreditCardPaymentRequest
      >({
        url: "/credit-card",
        method: HttpMethod.Post,
        data,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPixQrCode(paymentId: string) {
    try {
      const response = await this.client.request<GetPixQrCodeResponse>({
        url: `/pix/${paymentId}/qrcode`,
        method: HttpMethod.Get,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
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
