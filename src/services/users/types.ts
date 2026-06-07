export interface ICreateUsersRequest {
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
