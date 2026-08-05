import { queryOptions } from "@tanstack/react-query";

import { userAddressServices, type UserAddressProps } from ".";
import type { AuthUser } from "../../context/auth/types";
import type { AccountAddress } from "../../pages/products/AccountSettings/components/SectionAddress/types";
import { Mask } from "../../utils/mask";

function toAccountAddress(address: UserAddressProps): AccountAddress {
  return {
    id: address.id,
    label: address.label,
    street: address.address,
    number: address.number,
    complement: address.complement ?? undefined,
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
    zipCode: Mask.zipCode(address.postalCode),
  };
}

export const addressQueryKeys = {
  all: ["user-address"],
  list: (user?: number) => [...addressQueryKeys.all, "list", user],
};

export function userAddressQueryOptions(user: AuthUser) {
  return queryOptions({
    queryKey: addressQueryKeys.list(user.id),
    queryFn: async () => {
      const response = await userAddressServices.getAddress(user?.id as number);

      return response.data.map(toAccountAddress);
    },
    enabled: Boolean(user),
  });
}
