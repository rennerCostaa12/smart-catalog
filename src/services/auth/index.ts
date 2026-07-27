import { httpClient, HttpMethod, type HttpClient } from "../../http";
import type {
  ILogoutResponse,
  IMeResponse,
  ISignInUserRequest,
  ISignInUserResponse,
} from "./types";

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

  async logout() {
    const response = await this.client.request<ILogoutResponse>({
      url: "/auth/logout",
      method: HttpMethod.Post,
    });

    return response.data;
  }

  async me() {
    const response = await this.client.request<IMeResponse>({
      url: "/auth/me",
      method: HttpMethod.Get,
    });

    return response.data;
  }
}

export const authService = new AuthService();

export type { ISignInUserRequest, ISignInUserResponse };
