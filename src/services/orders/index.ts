import { readAuthSessionCookie } from "../../context/auth/sessionCookie";
import { httpClient, HttpMethod, type HttpClient } from "../../http";
import type {
  CreateOrdersRequest,
  CreateOrdersResponse,
  ListOrdersResponse,
} from "./types";

export class OrdersService {
  constructor(private readonly client: HttpClient = httpClient) {}

  async createOrders(data: CreateOrdersRequest, userId: string) {
    const response = await this.client.request<
      CreateOrdersResponse,
      CreateOrdersRequest
    >({
      url: `/orders/${userId}`,
      method: HttpMethod.Post,
      data,
    });

    return response.data;
  }

  async listOrders(userId: string) {
    const response = await this.client.request<ListOrdersResponse, unknown>({
      url: `/orders/${userId}`,
      method: HttpMethod.Get,
    });

    return response.data;
  }
}

export const ordersService = new OrdersService();

export type { CreateOrdersRequest, CreateOrdersResponse, ListOrdersResponse };
