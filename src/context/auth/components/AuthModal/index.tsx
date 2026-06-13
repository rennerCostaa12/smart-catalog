import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Modal } from "../../../../components/Modal";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Typography } from "../../../../components/ui/typography";
import { authService } from "../../../../services";
import type { AuthLoginData, AuthModalProps } from "../../types";
import { initialAuthValues } from "../../constants";
import { authModalSchema } from "./schema";

export function AuthModal({
  open,
  onClose,
  onAuthenticate,
  onOpenRegister,
}: AuthModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthLoginData>({
    resolver: yupResolver(authModalSchema),
    defaultValues: initialAuthValues,
    mode: "onChange",
  });

  const handleAuthenticate = handleSubmit(async (values) => {
    try {
      const response = await authService.signInUser({
        email: values?.email?.trim(),
      });

      onAuthenticate({
        ...response.data?.user,
        token: response.data?.token,
      });
      reset(initialAuthValues);
    } catch (error) {
      console.error(error);
      toast.error(
        (error instanceof Error ? error.message : undefined) ??
          "Não foi possível entrar. Verifique o email informado.",
      );
    }
  });

  const handleClose = () => {
    reset(initialAuthValues);
    onClose();
  };

  return (
    <Modal.Root open={open}>
      <Modal.Overlay onClick={handleClose} />

      <Modal.Content>
        <form
          onSubmit={handleAuthenticate}
          className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-xl"
        >
          <Modal.CloseButton onClick={handleClose} />

          <div className="pr-12">
            <Typography weight="bold">Entrar</Typography>

            <Typography className="mt-1" variant="bodySmall" color="muted">
              Informe seu email para continuar.
            </Typography>
          </div>

          <div className="mt-5 flex flex-col gap-4">
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
          </div>

          <Button
            className="mt-5 cursor-pointer"
            type="submit"
            fullWidth
            isLoading={isSubmitting}
          >
            Entrar
          </Button>

          <div className="mt-4 flex flex-col gap-2">
            <Typography align="center" color="muted">
              Ainda não possui cadastro?
            </Typography>
            <Button
              className="cursor-pointer"
              variant="outline"
              type="button"
              fullWidth
              disabled={isSubmitting}
              onClick={onOpenRegister}
            >
              Criar Conta
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
