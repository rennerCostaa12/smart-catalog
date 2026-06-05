import { AxiosHttpClient } from "./AxiosHttpClient";

export const httpClient = new AxiosHttpClient({
  baseURL: import.meta.env.VITE_API_URL,
});

export { AxiosHttpClient };
export { HttpMethod } from "./types";
export type {
  HttpClient,
  HttpHeaders,
  HttpHeaderValue,
  HttpRequest,
  HttpResponse,
} from "./types";
