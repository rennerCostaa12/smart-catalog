import { httpClient, HttpMethod, type HttpClient } from "../../http";
import type {
  IGetProductsRequest,
  IGetProductsResponse,
  ProductsProps,
} from "./types";

export class ProductsServices {
  constructor(private readonly client: HttpClient = httpClient) {}

  async getProducts({ page = 1, limit = 10, ...data }: IGetProductsRequest) {
    const { catalogClientName, ...dataRequest } = data;

    const response = await this.client.request<IGetProductsResponse>({
      url: `/products/catalog-client/${catalogClientName}`,
      method: HttpMethod.Get,
      data: dataRequest,
      params: {
        page,
        limit,
      },
    });

    return response.data;
  }
}

export const productsServices = new ProductsServices();

export type { IGetProductsRequest, IGetProductsResponse, ProductsProps };
