import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";
import type { HttpClient, HttpRequest, HttpResponse } from "./types";
import { notifyUnauthorized } from "./unauthorized";

export class AxiosHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor(config?: CreateAxiosDefaults) {
    this.client = axios.create(config);
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          notifyUnauthorized();
        }

        return Promise.reject(error);
      },
    );
  }

  async request<TResponse, TData = unknown>({
    url,
    method,
    data,
    headers,
    params,
  }: HttpRequest<TData>): Promise<HttpResponse<TResponse>> {
    const response = await this.client.request<TResponse>({
      url,
      method,
      data,
      headers,
      params,
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }
}
