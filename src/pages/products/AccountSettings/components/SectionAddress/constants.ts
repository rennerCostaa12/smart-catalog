import type { IUserAddressRequest } from "../../../../../services";
import type { AccountAddressFormData } from "./types";

export const emptyAddressForm: AccountAddressFormData = {
  label: "",
  street: "",
  number: 0,
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  zipCode: "",
};

export const LIMIT_ADDRESS = 3;

export function toAddressRequest(
  values: AccountAddressFormData,
  userId: number,
): IUserAddressRequest {
  const complement = values.complement?.trim() || null;

  return {
    label: values.label.trim(),
    address: values.street.trim(),
    number: Number(values.number),
    complement,
    neighborhood: values.neighborhood.trim(),
    city: values.city.trim(),
    state: values.state.trim().toUpperCase(),
    postalCode: values.zipCode.replace(/\D/g, ""),
    userId,
  };
}