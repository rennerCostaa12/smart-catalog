import { httpClientCep, HttpMethod, type HttpClient } from "../../http";
import type { ICepResponse } from "./types";

export class CepServices {
  constructor(private readonly client: HttpClient = httpClientCep) {}

  async getCep(cep: string) {
    const response = await this.client.request<ICepResponse>({
      url: `/${cep}/json`,
      method: HttpMethod.Get,
    });

    return response.data;
  }
}

export const cepServices = new CepServices();

export type { ICepResponse };
