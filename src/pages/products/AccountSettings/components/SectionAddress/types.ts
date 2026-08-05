import * as yup from "yup";

import { sectionAddressSchema } from "./components/AddressModal/schema";

export type AccountAddressFormData = yup.InferType<typeof sectionAddressSchema>;

export interface AccountAddress {
  id: number;
  label: string;
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}
