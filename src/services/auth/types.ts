export type UserProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export interface ISignInUserResponse {
  data: {
    user: UserProps;
  };
}

export interface ISignInUserRequest {
  email: string;
}

export interface ILogoutResponse {
  data: null;
}

export interface IMeResponse {
  data: UserProps;
}
