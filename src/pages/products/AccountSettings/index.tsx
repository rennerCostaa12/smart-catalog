import { Controller } from "react-hook-form";
import { Edit, Mail, Phone, UserCircle } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Typography } from "../../../components/ui/typography";

import { Mask } from "../../../utils/mask";

import { useAccountSettings } from "./useAccountSettings";

export function AccountSettingsPage() {
  const {
    handleCancelEdit,
    setIsEditing,
    isEditing,
    control,
    handleSaveInfo,
    isSaving,
  } = useAccountSettings();

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex max-w-2xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Typography variant="h1">Configurações da conta</Typography>
          <Typography variant="body" color="muted">
            Visualize os dados cadastrados na sua conta.
          </Typography>
        </div>

        <section className="flex flex-col gap-4">
          <Typography variant="h2">Dados da conta</Typography>

          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              name="name"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    label="Nome"
                    name={name}
                    value={value}
                    disabled={!isEditing || isSaving}
                    leftIcon={<UserCircle size={18} />}
                    onChange={onChange}
                    error={error?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="email"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    name={name}
                    label="Email"
                    type="email"
                    value={value}
                    disabled={!isEditing || isSaving}
                    leftIcon={<Mail size={18} />}
                    onChange={onChange}
                    error={error?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="phone"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    name={name}
                    label="Telefone"
                    value={value}
                    disabled={!isEditing || isSaving}
                    leftIcon={<Phone size={18} />}
                    onChange={(event) =>
                      onChange(Mask.phone(event.target.value))
                    }
                    error={error?.message}
                  />
                );
              }}
            />
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 w-full">
          {isEditing ? (
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="cursor-pointer max-sm:w-full"
                disabled={isSaving}
                onClick={handleCancelEdit}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                className="cursor-pointer max-sm:w-full"
                isLoading={isSaving}
                onClick={handleSaveInfo}
              >
                Salvar
              </Button>
            </div>
          ) : (
            <Button
              className="cursor-pointer max-sm:w-full"
              leftIcon={<Edit size={18} />}
              onClick={() => setIsEditing(true)}
            >
              Editar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
