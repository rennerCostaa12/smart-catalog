import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";

import type { HttpClient, HttpRequest, HttpResponse } from "./types";

export class AxiosHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor(config?: CreateAxiosDefaults) {
    this.client = axios.create(config);
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
