import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ROUTE_SEGMENTS } from "../../../../../../app/constants";
import { useAuth } from "../../../../../context/auth/useAuth";
import { usersService } from "../../../../../services";
import { Mask } from "../../../../../utils/mask";
import { sectionAccountSchema } from "./schema";
import { type SectionAccountFormData } from "./types";

export function useSectionAccount() {
  const { authenticate, user } = useAuth();
  const navigate = useNavigate();
  const sessionUser = user;
  const [isEditing, setIsEditing] = useState(false);

  const { control, reset, handleSubmit } = useForm<SectionAccountFormData>({
    defaultValues: {
      name: sessionUser?.name,
      email: sessionUser?.email,
      phone: sessionUser?.phone,
    },
    resolver: yupResolver(sectionAccountSchema),
  });

  const updateUserMutation = useMutation({
    mutationFn: (values: SectionAccountFormData) => {
      if (!sessionUser) {
        throw new Error("Entre na sua conta antes de atualizar seus dados.");
      }

      return usersService.updateUser(
        {
          name: values.name.trim(),
          email: values.email.trim(),
          phone: Mask.parseDocument(values.phone),
        },
        sessionUser.id,
      );
    },
  });

  useEffect(() => {
    if (!sessionUser) {
      navigate(`../${ROUTE_SEGMENTS.products.listProducts}?categoria=todos`, {
        replace: true,
      });
      return;
    }

    reset({
      email: sessionUser.email,
      name: sessionUser.name,
      phone: sessionUser.phone,
    });
  }, [
    navigate,
    reset,
    sessionUser,
    sessionUser?.email,
    sessionUser?.name,
    sessionUser?.phone,
  ]);

  const handleCancelEdit = () => {
    if (!sessionUser) {
      return;
    }

    reset({
      name: sessionUser.name,
      email: sessionUser.email,
      phone: sessionUser.phone,
    });

    setIsEditing(false);
  };

  const handleSaveInfo = handleSubmit((data: SectionAccountFormData) => {
    if (!sessionUser) {
      return;
    }

    updateUserMutation.mutate(data, {
      onSuccess: (updatedUser) => {
        authenticate({
          ...sessionUser,
          name: updatedUser?.data?.name,
          email: updatedUser?.data?.email,
          phone: updatedUser?.data?.phone,
        });
        toast.success("Dados atualizados com sucesso.");
        setIsEditing(false);
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          (error instanceof Error ? error.message : undefined) ??
            "Não foi possível atualizar os dados. Tente novamente.",
        );
      },
    });
  });

  return {
    handleCancelEdit,
    setIsEditing,
    isEditing,
    control,
    handleSaveInfo,
    isSaving: updateUserMutation.isPending,
  };
}
