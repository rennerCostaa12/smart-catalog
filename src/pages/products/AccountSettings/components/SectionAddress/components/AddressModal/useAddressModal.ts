import { useEffect, useRef } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { type Resolver, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { sectionAddressSchema } from "./schema";
import { type AddressModalFormData, type UseAddressModalParams } from "./types";
import { emptyAddressForm } from "../../constants";
import { cepServices } from "../../../../../../../services";
import { ZIP_CODE_DIGITS_LENGTH } from "./constants";

export function useAddressModal({
  open,
  initialValues,
  onSave,
}: UseAddressModalParams) {
  const lastFetchedZipCodeRef = useRef<string | null>(null);
  const {
    control,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { dirtyFields, isSubmitting },
  } = useForm<AddressModalFormData>({
    defaultValues: emptyAddressForm,
    resolver: yupResolver(
      sectionAddressSchema,
    ) as Resolver<AddressModalFormData>,
  });

  const { mutate: fetchCep, isPending: isFetchingCep } = useMutation({
    mutationFn: (zipCode: string) => cepServices.getCep(zipCode),
  });

  const zipCode = watch("zipCode");
  const zipCodeDigits = zipCode?.replace(/\D/g, "") ?? "";
  const isZipCodeDirty = Boolean(dirtyFields.zipCode);

  useEffect(() => {
    if (!open) {
      return;
    }

    reset(initialValues ?? emptyAddressForm);
    lastFetchedZipCodeRef.current =
      initialValues?.zipCode?.replace(/\D/g, "") ?? null;
  }, [initialValues, open, reset]);

  const handleGetInfoCep = () => {
    fetchCep(zipCodeDigits, {
      onSuccess: (cepData) => {
        if (lastFetchedZipCodeRef.current !== zipCodeDigits) {
          return;
        }

        if (cepData.erro) {
          toast.error("CEP não encontrado.");
          return;
        }

        setValue("street", cepData.logradouro ?? "", {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("neighborhood", cepData.bairro ?? "", {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("city", cepData.localidade ?? "", {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("state", cepData.uf ?? "", {
          shouldDirty: true,
          shouldValidate: true,
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error("Não foi possível buscar o CEP. Tente novamente.");
      },
    });
  };

  useEffect(() => {
    const hasNotFetchInfoAddress =
      !open ||
      !isZipCodeDirty ||
      zipCodeDigits.length !== ZIP_CODE_DIGITS_LENGTH ||
      lastFetchedZipCodeRef.current === zipCodeDigits;

    if (hasNotFetchInfoAddress) {
      return;
    }

    handleGetInfoCep();

    lastFetchedZipCodeRef.current = zipCodeDigits;
  }, [fetchCep, isZipCodeDirty, open, setValue, zipCodeDigits]);

  const handleSaveAddress = handleSubmit(async (values) => {
    await onSave({
      label: values.label.trim(),
      street: values.street.trim(),
      number: Number(values.number),
      complement: values.complement?.trim(),
      neighborhood: values.neighborhood.trim(),
      city: values.city.trim(),
      state: values.state.trim().toUpperCase(),
      zipCode: values.zipCode.trim(),
    });

    reset();
  });

  return {
    control,
    handleSaveAddress,
    isFetchingCep,
    isSubmitting,
  };
}
