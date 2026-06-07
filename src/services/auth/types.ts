export type UserProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export interface ISignInUserResponse {
  data: {
    user: UserProps;
    token: string;
  };
}

export interface ISignInUserRequest {
  email: string;
}
