import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useController } from "react-hook-form";
import { useAuth } from "../../../../context/auth/useAuth";
import {
  userAddressServices,
  type UserAddressProps,
} from "../../../../services";
import { ROUTE_SEGMENTS } from "~/constants";
import { DeliveryMethodEnum, type IDeliveryMethodProps } from "./types";
import { useQuery } from "@tanstack/react-query";
import { formatUserAddress } from "../../../../utils/formatUserAddress";

export function useDeliveryMethod({
  control,
}: Pick<IDeliveryMethodProps, "control">) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const {
    field: { value: deliveryMethodValue, onChange: onChangeDeliveryMethod },
  } = useController({
    control,
    name: "deliveryMethod",
  });

  const {
    field: { value: userAddressId, onChange: onAddressIdChange },
  } = useController({
    control,
    name: "userAddressId",
  });

  const {
    field: { onChange: onAddressValueChange },
  } = useController({
    control,
    name: "addressValue",
  });

  const fetchAddressByUser = async () => {
    if (!user?.id) {
      return [];
    }

    const response = await userAddressServices.getAddress(user.id);

    return response.data;
  };

  const addressQuery = useQuery({
    queryKey: ["user-address", "list", user?.id],
    queryFn: fetchAddressByUser,
    enabled:
      deliveryMethodValue === DeliveryMethodEnum.DELIVERY && Boolean(user?.id),
  });

  const addresses = addressQuery.data ?? [];
  const hasAddress = addresses.length > 0;

  const selectedAddress =
    addresses.find((address) => address.id === userAddressId) ?? null;
  const deliveryAddress = selectedAddress ?? addresses[0] ?? null;

  useEffect(() => {
    if (deliveryMethodValue !== DeliveryMethodEnum.DELIVERY || !hasAddress) {
      return;
    }

    const nextAddress = deliveryAddress;

    if (nextAddress.id !== userAddressId) {
      onAddressIdChange(nextAddress.id);
    }

    onAddressValueChange(formatUserAddress(nextAddress));
  }, [
    addresses,
    hasAddress,
    deliveryAddress,
    onAddressIdChange,
    onAddressValueChange,
    userAddressId,
    deliveryMethodValue,
  ]);

  function handleDeliveryMethodChange(nextValue: string) {
    onChangeDeliveryMethod(nextValue as DeliveryMethodEnum);

    if (nextValue === DeliveryMethodEnum.PICKUP) {
      onAddressIdChange(null);
      onAddressValueChange("");
    }
  }

  function handleCreateAddress() {
    navigate(`../${ROUTE_SEGMENTS.products.accountSettings}`);
  }

  function handleSelectAddress(address: UserAddressProps) {
    onAddressIdChange(address.id);
    onAddressValueChange(formatUserAddress(address));
    setIsAddressModalOpen(false);
  }

  return {
    handleSelectAddress,
    handleCreateAddress,
    handleDeliveryMethodChange,
    setIsAddressModalOpen,
    isLoadingAddresses: addressQuery.isLoading,
    isAddressModalOpen,
    deliveryMethodValue,
    hasAddress,
    deliveryAddress,
    addresses,
    userAddressId,
  };
}
