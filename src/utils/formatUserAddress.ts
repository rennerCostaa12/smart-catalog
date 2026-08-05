import type { UserAddressItem } from "../services/orders/types";
import { Mask } from "./mask";

export function formatUserAddress(address: UserAddressItem): string {
  return [
    `${address.address}, ${address.number}`,
    address.complement,
    address.neighborhood,
    `${address.city} - ${address.state}`,
    `CEP ${Mask.zipCode(address.postalCode)}`,
  ]
    .filter(Boolean)
    .join(" - ");
}
