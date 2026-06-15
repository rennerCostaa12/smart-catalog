import { httpClient, HttpMethod, type HttpClient } from "../../http";
import type {
  CatalogClient,
  CatalogClientsRequest,
  CatalogClientsResponse,
} from "./types";

export class CatalogsClientsService {
  constructor(private readonly client: HttpClient = httpClient) {}

  async getCatalogClientBySlug({ slug }: CatalogClientsRequest) {
    const response = await this.client.request<CatalogClientsResponse>({
      url: `/catalog-clients/slug/${slug}`,
      method: HttpMethod.Get,
    });

    return response.data;
  }
}

export const catalogsClientsService = new CatalogsClientsService();

export type {
  CatalogClient,
  CatalogClientsResponse,
  CatalogClientsRequest,
};
