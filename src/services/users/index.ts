import { httpClient, HttpMethod, type HttpClient } from "../../http";
import type {
  IUserRequest,
  ICreateUsersResponse,
  IUpdateUsersResponse,
} from "./types";

export class UsersService {
  constructor(private readonly client: HttpClient = httpClient) {}

  async createUser(data: IUserRequest) {
    const response = await this.client.request<
      ICreateUsersResponse,
      IUserRequest
    >({
      url: "/users",
      method: HttpMethod.Post,
      data,
    });

    return response.data;
  }

  async updateUser(data: IUserRequest, userId: number) {
    const response = await this.client.request<
      IUpdateUsersResponse,
      IUserRequest
    >({
      url: `/users/${userId}`,
      method: HttpMethod.Patch,
      data,
    });

    return response.data;
  }
}

export const usersService = new UsersService();

export type { IUserRequest, ICreateUsersResponse, IUpdateUsersResponse };
