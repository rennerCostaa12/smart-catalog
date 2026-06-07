import { httpClient, HttpMethod, type HttpClient } from "../../http";
import type { ICreateUsersRequest, ICreateUsersResponse } from "./types";

export class UsersService {
  constructor(private readonly client: HttpClient = httpClient) {}

  async createUser(data: ICreateUsersRequest) {
    const response = await this.client.request<
      ICreateUsersResponse,
      ICreateUsersRequest
    >({
      url: "/users",
      method: HttpMethod.Post,
      data,
    });

    return response.data;
  }
}

export const usersService = new UsersService();

export type { ICreateUsersRequest, ICreateUsersResponse };
