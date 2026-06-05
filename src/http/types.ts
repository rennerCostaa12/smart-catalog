export enum HttpMethod {
  Post = "POST",
  Get = "GET",
  Patch = "PATCH",
  Delete = "DELETE",
  Put = "PUT",
}

export type HttpHeaderValue = string | number | boolean | string[];

export type HttpHeaders = Record<string, HttpHeaderValue>;

export type HttpRequest<TData = unknown> = {
  url: string;
  method: HttpMethod;
  data?: TData;
  headers?: HttpHeaders;
  params?: Record<string, unknown>;
};

export type HttpResponse<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
};

export interface HttpClient {
  request<TResponse, TData = unknown>(
    request: HttpRequest<TData>,
  ): Promise<HttpResponse<TResponse>>;
}
