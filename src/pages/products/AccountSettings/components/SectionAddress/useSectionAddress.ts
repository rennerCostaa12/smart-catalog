import { useMemo, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { type AccountAddress, type AccountAddressFormData } from "./types";
import { emptyAddressForm, toAddressRequest } from "./constants";
import { useAuth } from "../../../../../context/auth/useAuth";
import { userAddressServices } from "../../../../../services/user_address";
import { addressQueryKeys } from "../../../../../services/user_address/queries";
import { userAddressQueryOptions } from "../../../../../services/user_address/queries";
import type { AuthUser } from "../../../../../context/auth/types";

export function useSectionAddress() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(
    null,
  );

  const addressQueryKey = useMemo(
    () => addressQueryKeys.list(user?.id),
    [user?.id],
  );

  const addressQuery = useQuery(userAddressQueryOptions(user as AuthUser));

  const createAddressMutation = useMutation({
    mutationFn: (values: AccountAddressFormData) => {
      if (!user) {
        throw new Error("Entre na sua conta antes de cadastrar um endereço.");
      }

      return userAddressServices.createAddress(
        toAddressRequest(values, user.id),
      );
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({
      values,
      addressId,
    }: {
      values: AccountAddressFormData;
      addressId: number;
    }) => {
      if (!user) {
        throw new Error("Entre na sua conta antes de atualizar um endereço.");
      }

      return userAddressServices.updateAddress(
        toAddressRequest(values, user.id),
        addressId,
      );
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: (addressId: number) =>
      userAddressServices.deleteAddress(addressId),
  });

  const addresses = addressQuery.data ?? [];

  const editingAddress =
    addresses.find((address) => address.id === editingAddressId) ?? null;

  const handleOpenAddAddressModal = () => {
    setEditingAddressId(null);
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddressModal = (address: AccountAddress) => {
    setEditingAddressId(address.id);
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
    setEditingAddressId(null);
  };

  const handleSaveAddress = async (values: AccountAddressFormData) => {
    try {
      if (editingAddressId) {
        await updateAddressMutation.mutateAsync({
          values,
          addressId: editingAddressId,
        });
      } else {
        await createAddressMutation.mutateAsync(values);
      }

      await queryClient.invalidateQueries({ queryKey: addressQueryKey });
      toast.success(
        editingAddressId
          ? "Endereço atualizado com sucesso."
          : "Endereço adicionado com sucesso.",
      );
      handleCloseAddressModal();
    } catch (error) {
      console.error(error);
      toast.error(
        (error instanceof Error ? error.message : undefined) ??
          "Não foi possível salvar o endereço. Tente novamente.",
      );
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      setDeletingAddressId(addressId);
      await deleteAddressMutation.mutateAsync(addressId);
      await queryClient.invalidateQueries({ queryKey: addressQueryKey });
      toast.success("Endereço removido com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error(
        (error instanceof Error ? error.message : undefined) ??
          "Não foi possível remover o endereço. Tente novamente.",
      );
    } finally {
      setDeletingAddressId(null);
    }
  };

  const lengthAddress = addresses.length;

  return {
    addresses,
    editingAddress: editingAddress ?? emptyAddressForm,
    isAddressModalOpen,
    isEditingAddress: Boolean(editingAddressId),
    isLoadingAddresses: addressQuery.isPending && Boolean(user),
    isSavingAddress:
      createAddressMutation.isPending || updateAddressMutation.isPending,
    deletingAddressId,
    handleOpenAddAddressModal,
    handleOpenEditAddressModal,
    handleCloseAddressModal,
    handleSaveAddress,
    handleDeleteAddress,
    lengthAddress,
  };
}
