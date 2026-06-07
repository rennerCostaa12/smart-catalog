import { httpClient, HttpMethod, type HttpClient } from "../../http";
import type { ISignInUserRequest, ISignInUserResponse } from "./types";

export class AuthService {
  constructor(private readonly client: HttpClient = httpClient) {}

  async signInUser(data: ISignInUserRequest) {
    const response = await this.client.request<
      ISignInUserResponse,
      ISignInUserRequest
    >({
      url: "/auth/users/login",
      method: HttpMethod.Post,
      data,
    });

    return response.data;
  }
}

export const authService = new AuthService();

export type { ISignInUserRequest, ISignInUserResponse };
