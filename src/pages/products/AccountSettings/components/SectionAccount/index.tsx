import { Controller } from "react-hook-form";
import { Edit, Mail, Phone, UserCircle } from "lucide-react";

import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Typography } from "../../../../../components/ui/typography";
import { Mask } from "../../../../../utils/mask";
import { useSectionAccount } from "./useSectionAccount";

export function SectionAccount() {
  const {
    handleCancelEdit,
    setIsEditing,
    isEditing,
    control,
    handleSaveInfo,
    isSaving,
  } = useSectionAccount();

  return (
    <section className="flex flex-col gap-4">
      <Typography variant="h2">Dados da conta</Typography>

      <div className="grid gap-4 sm:grid-cols-2">
        <Controller
          control={control}
          name="name"
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
            <Input
              label="Nome"
              name={name}
              value={value}
              disabled={!isEditing || isSaving}
              leftIcon={<UserCircle size={18} />}
              onChange={onChange}
              error={error?.message}
              inputSize="sm"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
            <Input
              name={name}
              label="Email"
              type="email"
              value={value}
              disabled={!isEditing || isSaving}
              leftIcon={<Mail size={18} />}
              onChange={onChange}
              error={error?.message}
              inputSize="sm"
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
            <Input
              name={name}
              label="Telefone"
              value={value}
              disabled={!isEditing || isSaving}
              leftIcon={<Phone size={18} />}
              onChange={(event) => onChange(Mask.phone(event.target.value))}
              error={error?.message}
              inputSize="sm"
            />
          )}
        />
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        {isEditing ? (
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              className="cursor-pointer max-sm:w-full"
              disabled={isSaving}
              onClick={handleCancelEdit}
              size="md"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              className="cursor-pointer max-sm:w-full"
              isLoading={isSaving}
              onClick={handleSaveInfo}
              size="md"
            >
              Salvar
            </Button>
          </div>
        ) : (
          <Button
            className="cursor-pointer max-sm:w-full"
            leftIcon={<Edit size={18} />}
            onClick={() => setIsEditing(true)}
            size="md"
          >
            Editar
          </Button>
        )}
      </div>
    </section>
  );
}
