export interface IUserRequest {
  name: string;
  email: string;
  phone: string;
}

export interface ICreateUsersResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface IUpdateUsersResponse {
  data: {
    name: string;
    email: string;
    phone: string;
  };
}
