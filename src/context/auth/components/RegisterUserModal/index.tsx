import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { Modal } from "../../../../components/Modal";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Typography } from "../../../../components/ui/typography";
import { Mask } from "../../../../utils/mask";
import { initialRegisterUserValues } from "../../constants";
import type { AuthRegisterData, RegisterUserModalProps } from "../../types";
import { registerUserModalSchema } from "./schema";

export function RegisterUserModal({
  open,
  onClose,
  onRegister,
}: RegisterUserModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthRegisterData>({
    resolver: yupResolver(registerUserModalSchema),
    defaultValues: initialRegisterUserValues,
    mode: "onChange",
  });

  const handleRegister = handleSubmit((values) => {
    // TODO: realizar integração com endpoint de cadastro de usuário
    onRegister({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
    });

    reset(initialRegisterUserValues);
  });

  const handleClose = () => {
    reset(initialRegisterUserValues);
    onClose();
  };

  return (
    <Modal.Root open={open}>
      <Modal.Overlay onClick={handleClose} />

      <Modal.Content>
        <form
          onSubmit={handleRegister}
          className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-xl"
        >
          <Modal.CloseButton onClick={handleClose} />

          <div className="pr-12">
            <Typography weight="bold">Criar conta</Typography>

            <Typography className="mt-1" variant="bodySmall" color="muted">
              Informe seus dados para criar o cadastro.
            </Typography>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label="Nome"
                  placeholder="Seu nome"
                  value={field.value}
                  error={errors.name?.message}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  label="Email"
                  placeholder="email@exemplo.com"
                  type="email"
                  value={field.value}
                  error={errors.email?.message}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  label="Telefone"
                  placeholder="(00) 00000-0000"
                  inputMode="tel"
                  value={field.value}
                  error={errors.phone?.message}
                  onChange={(event) =>
                    field.onChange(Mask.phone(event.target.value))
                  }
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>

          <Button className="mt-5 cursor-pointer" type="submit" fullWidth>
            Criar conta
          </Button>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
