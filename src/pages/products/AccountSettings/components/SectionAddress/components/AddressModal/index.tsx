import { Controller } from "react-hook-form";
import { Loader2, MapPin } from "lucide-react";

import { Modal } from "../../../../../../../components/Modal";
import { Button } from "../../../../../../../components/ui/button";
import { Input } from "../../../../../../../components/ui/input";
import { Typography } from "../../../../../../../components/ui/typography";
import { Mask } from "../../../../../../../utils/mask";
import { type AddressModalProps } from "./types";
import { useAddressModal } from "./useAddressModal";

export function AddressModal({
  open,
  initialValues,
  isEditing = false,
  isSaving = false,
  onClose,
  onSave,
}: AddressModalProps) {
  const { control, handleSaveAddress, isFetchingCep, isSubmitting } =
    useAddressModal({
      open,
      initialValues,
      onSave,
    });

  return (
    <Modal.Root open={open}>
      <Modal.Overlay onClick={onClose} />

      <Modal.Content className="p-4">
        <form
          className="relative max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-xl"
          onSubmit={handleSaveAddress}
        >
          <Modal.CloseButton onClick={onClose} />

          <div className="pr-12">
            <Typography variant="h3">
              {isEditing ? "Editar endereço" : "Adicionar endereço"}
            </Typography>
          </div>

          <div className="mt-6 grid gap-4 max-sm:gap-2 sm:grid-cols-2">
            <Controller
              control={control}
              name="label"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  label="Nome do endereço"
                  placeholder="Casa"
                  value={value}
                  leftIcon={<MapPin size={18} />}
                  onChange={onChange}
                  error={error?.message}
                  inputSize="sm"
                />
              )}
            />

            <Controller
              control={control}
              name="zipCode"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  label="CEP"
                  placeholder="00000-000"
                  value={value}
                  onChange={(event) =>
                    onChange(Mask.zipCode(event.target.value))
                  }
                  maxLength={9}
                  rightIcon={
                    isFetchingCep ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : undefined
                  }
                  helperText={isFetchingCep ? "Buscando CEP..." : undefined}
                  error={error?.message}
                  inputSize="sm"
                />
              )}
            />

            <Controller
              control={control}
              name="street"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  label="Rua"
                  placeholder="Rua das Flores"
                  value={value}
                  containerClassName="sm:col-span-2"
                  onChange={onChange}
                  error={error?.message}
                  inputSize="sm"
                />
              )}
            />

            <Controller
              control={control}
              name="number"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  label="Número"
                  placeholder="120"
                  value={value}
                  onChange={(event) =>
                    onChange(Mask.numeric(event.target.value, 6))
                  }
                  error={error?.message}
                  inputSize="sm"
                />
              )}
            />

            <Controller
              control={control}
              name="complement"
              render={({ field: { name, value, onChange } }) => (
                <Input
                  name={name}
                  label="Complemento"
                  placeholder="Apto 302"
                  value={value ?? ""}
                  onChange={onChange}
                  inputSize="sm"
                />
              )}
            />

            <Controller
              control={control}
              name="neighborhood"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  label="Bairro"
                  placeholder="Centro"
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                  inputSize="sm"
                />
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  label="Cidade"
                  placeholder="Fortaleza"
                  disabled
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                  inputSize="sm"
                />
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  label="UF"
                  placeholder="CE"
                  disabled
                  value={value}
                  onChange={(event) =>
                    onChange(event.target.value.toUpperCase().slice(0, 2))
                  }
                  maxLength={2}
                  error={error?.message}
                  inputSize="sm"
                />
              )}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={onClose}
              disabled={isSubmitting || isSaving}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="cursor-pointer"
              isLoading={isSubmitting || isSaving}
            >
              {isEditing ? "Salvar alterações" : "Adicionar"}
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
