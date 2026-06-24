import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";

import type { HttpClient, HttpRequest, HttpResponse } from "./types";
import { readAuthSessionCookie } from "../context/auth/sessionCookie";
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
    const currentSession = readAuthSessionCookie();

    const defaultValuesHeader = currentSession
      ? { Authorization: `Bearer ${currentSession?.token}`, ...headers }
      : headers;

    const response = await this.client.request<TResponse>({
      url,
      method,
      data,
      headers: defaultValuesHeader,
      params,
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }
}
