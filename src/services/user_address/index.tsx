import { httpClient, HttpMethod, type HttpClient } from "../../http";
import type {
  IUserAddressResponse,
  IUserAddressRequest,
  UserAddressProps,
} from "./types";

export class UserAddressServices {
  constructor(private readonly client: HttpClient = httpClient) {}

  async getAddress(userId: number) {
    const response = await this.client.request<IUserAddressResponse>({
      url: `/user-address/user/${userId}`,
      method: HttpMethod.Get,
    });

    return response.data;
  }

  async createAddress(data: IUserAddressRequest) {
    const response = await this.client.request<IUserAddressResponse>({
      url: "/user-address",
      method: HttpMethod.Post,
      data,
    });

    return response.data;
  }

  async updateAddress(data: IUserAddressRequest, addressId: number) {
    const response = await this.client.request<IUserAddressResponse>({
      url: `/user-address/${addressId}`,
      method: HttpMethod.Patch,
      data,
    });

    return response.data;
  }

  async deleteAddress(addressId: number) {
    const response = await this.client.request<void>({
      url: `/user-address/${addressId}`,
      method: HttpMethod.Delete,
    });

    return response.data;
  }
}

export const userAddressServices = new UserAddressServices();

export type { UserAddressProps, IUserAddressResponse, IUserAddressRequest };
