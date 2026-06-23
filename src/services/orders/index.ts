import { httpClient, HttpMethod, type HttpClient } from "../../http";
import type {
  CreateOrdersRequest,
  CreateOrdersResponse,
  ListOrdersResponse,
} from "./types";

export class OrdersService {
  constructor(private readonly client: HttpClient = httpClient) {}

  async createOrders(
    data: CreateOrdersRequest,
    userId: string,
    token?: string,
  ) {
    const response = await this.client.request<
      CreateOrdersResponse,
      CreateOrdersRequest
    >({
      url: `/orders/${userId}`,
      method: HttpMethod.Post,
      data,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    return response.data;
  }

  async listOrders(userId: string, token?: string) {
    const response = await this.client.request<ListOrdersResponse, unknown>({
      url: `/orders/${userId}`,
      method: HttpMethod.Get,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    return response.data;
  }
}

export const ordersService = new OrdersService();

export type { CreateOrdersRequest, CreateOrdersResponse, ListOrdersResponse };
