import { Controller, useController } from "react-hook-form";

import { cn } from "../../../../utils/mergeClass";
import { Mask } from "../../../../utils/mask";
import { Tab } from "../../../Tab";
import { Input } from "../../../ui/input";
import { Typography } from "../../../ui/typography";
import { DeliveryMethodEnum, type IDeliveryMethodProps } from "./types";

export function DeliveryMethod({ control, className }: IDeliveryMethodProps) {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name: "deliveryMethod",
  });

  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-white p-4 shadow-sm",
        className,
      )}
    >
      <div className="mb-4">
        <Typography weight="bold">Entrega</Typography>
      </div>

      <Tab.Root
        defaultValue={DeliveryMethodEnum.DELIVERY}
        value={value}
        onValueChange={(nextValue) => onChange(nextValue as DeliveryMethodEnum)}
      >
        <Tab.List className="w-full">
          <Tab.Trigger className="flex-1" value={DeliveryMethodEnum.DELIVERY}>
            Entrega
          </Tab.Trigger>

          <Tab.Trigger className="flex-1" value={DeliveryMethodEnum.PICKUP}>
            Retirar
          </Tab.Trigger>
        </Tab.List>
      </Tab.Root>

      {value === DeliveryMethodEnum.PICKUP && (
        <div className="mt-4 flex flex-col gap-4">
          <Typography variant="bodySmall" color="default">
            Endereço de retirada: <br /> Travessa Pompeia, 141 - Barra do Ceará
          </Typography>

          <Controller
            control={control}
            name="documentValue"
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  inputSize="sm"
                  label="Documento"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  value={value}
                  error={error?.message}
                  inputMode="numeric"
                  onChange={(event) =>
                    onChange(Mask.document(event.target.value))
                  }
                />
              );
            }}
          />
        </div>
      )}

      {value === DeliveryMethodEnum.DELIVERY && (
        <div className="mt-4 flex flex-col gap-4">
          <Controller
            control={control}
            name="addressValue"
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  inputSize="sm"
                  label="Endereco"
                  placeholder="Digite o endereco de entrega"
                  value={value}
                  error={error?.message}
                  onChange={(event) => onChange(event.target.value)}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="receiverNameValue"
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  inputSize="sm"
                  label="Nome do recebedor"
                  placeholder="Digite o nome do recebedor"
                  value={value}
                  error={error?.message}
                  onChange={(event) => onChange(event.target.value)}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="documentValue"
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  inputSize="sm"
                  label="Documento"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  value={value}
                  error={error?.message}
                  inputMode="numeric"
                  onChange={(event) =>
                    onChange(Mask.document(event.target.value))
                  }
                />
              );
            }}
          />
        </div>
      )}
    </section>
  );
}
