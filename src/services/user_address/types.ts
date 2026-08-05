export type UserAddressProps = {
  id: number;
  label: string;
  address: string;
  neighborhood: string;
  complement: string | null;
  city: string;
  state: string;
  number: number;
  postalCode: string;
  userId: number;
};

export interface IUserAddressResponse {
  data: UserAddressProps[];
}

export interface IUserAddressRequest {
  label: string;
  address: string;
  neighborhood: string;
  complement: string | null;
  city: string;
  state: string;
  number: number;
  postalCode: string;
  userId: number;
}
