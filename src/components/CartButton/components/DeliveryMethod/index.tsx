import { cn } from "../../../../utils/mergeClass";
import { Tab } from "../../../Tab";
import { Input } from "../../../ui/input";
import { Typography } from "../../../ui/typography";
import { DeliveryMethodEnum, type IDeliveryMethodProps } from "./types";

export function DeliveryMethod({
  className,
  value,
  onValueChange,
  addressValue,
  onAddressChange,
  receiverNameValue,
  onReceiverNameChange,
  addressError,
  receiverNameError,
}: IDeliveryMethodProps) {
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
        onValueChange={(nextValue) =>
          onValueChange(nextValue as DeliveryMethodEnum)
        }
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
        <div className="mt-4">
          <Typography variant="bodySmall" color="default">
            Endereço de retirada: <br /> Travessa Pompeia, 141 - Barra do Ceará
          </Typography>
        </div>
      )}

      {value === DeliveryMethodEnum.DELIVERY && (
        <div className="mt-4 flex flex-col gap-4">
          <Input
            inputSize="sm"
            label="Endereco"
            placeholder="Digite o endereco de entrega"
            value={addressValue}
            error={addressError}
            onChange={(event) => onAddressChange(event.target.value)}
          />

          <Input
            inputSize="sm"
            label="Nome do recebedor"
            placeholder="Digite o nome do recebedor"
            value={receiverNameValue}
            error={receiverNameError}
            onChange={(event) => onReceiverNameChange(event.target.value)}
          />
        </div>
      )}
    </section>
  );
}
