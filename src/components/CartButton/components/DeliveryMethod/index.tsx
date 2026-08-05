import { MapPin, Plus } from "lucide-react";
import { Controller } from "react-hook-form";

import { cn } from "../../../../utils/mergeClass";
import { Mask } from "../../../../utils/mask";
import { Tab } from "../../../Tab";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Typography } from "../../../ui/typography";
import { AddressSelectionModal } from "./components/AddressSelectionModal";
import { DeliveryMethodEnum, type IDeliveryMethodProps } from "./types";

import { useDeliveryMethod } from "./useDeliveryMethod";
import { formatUserAddress } from "../../../../utils/formatUserAddress";

export function DeliveryMethod({ control, className }: IDeliveryMethodProps) {
  const {
    handleCreateAddress,
    handleDeliveryMethodChange,
    handleSelectAddress,
    setIsAddressModalOpen,
    isAddressModalOpen,
    isLoadingAddresses,
    deliveryMethodValue,
    deliveryAddress,
    hasAddress,
    addresses,
    userAddressId,
  } = useDeliveryMethod({ control });

  return (
    <>
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
          value={deliveryMethodValue}
          onValueChange={handleDeliveryMethodChange}
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

        {deliveryMethodValue === DeliveryMethodEnum.PICKUP && (
          <div className="mt-4 flex flex-col gap-4">
            <Typography variant="bodySmall" color="default">
              Endereço de retirada: <br /> Travessa Pompeia, 141 - Barra do
              Ceará - Fortaleza - CE - CEP 60332-680
            </Typography>

            <Controller
              control={control}
              name="documentValue"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
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

        {deliveryMethodValue === DeliveryMethodEnum.DELIVERY && (
          <div className="mt-4 flex flex-col gap-4">
            {isLoadingAddresses ? (
              <div className="rounded-xl border border-border bg-surface-soft p-4">
                <Typography variant="bodySmall" color="muted">
                  Carregando enderecos...
                </Typography>
              </div>
            ) : hasAddress && deliveryAddress ? (
              <Controller
                control={control}
                name="userAddressId"
                render={({ fieldState: { error } }) => {
                  return (
                    <div className="flex flex-col gap-2">
                      <Typography variant="bodySmall" weight="medium">
                        Endereco de entrega
                      </Typography>

                      <div className="rounded-xl border border-primary bg-primary-light p-3">
                        <div className="flex gap-3">
                          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                            <MapPin size={18} />
                          </span>

                          <div className="min-w-0 flex-1">
                            <Typography variant="bodySmall" weight="bold">
                              {deliveryAddress.label}
                            </Typography>

                            <Typography variant="bodySmall" color="muted">
                              {formatUserAddress(deliveryAddress)}
                            </Typography>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-3 cursor-pointer"
                          onClick={() => setIsAddressModalOpen(true)}
                        >
                          Alterar endereco
                        </Button>
                      </div>

                      {error?.message && (
                        <p className="text-xs leading-5 text-red-500">
                          {error.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <Typography variant="bodySmall" weight="bold">
                  Nenhum endereco cadastrado.
                </Typography>

                <Typography className="mt-1" variant="bodySmall" color="muted">
                  Cadastre um endereco para seguir com o fluxo de pagamento por
                  entrega.
                </Typography>

                <Button
                  type="button"
                  className="mt-3 cursor-pointer"
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  onClick={handleCreateAddress}
                >
                  Cadastrar endereco
                </Button>
              </div>
            )}

            <Controller
              control={control}
              name="receiverNameValue"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
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
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
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

      <AddressSelectionModal
        open={isAddressModalOpen}
        addresses={addresses}
        selectedAddressId={userAddressId}
        onClose={() => setIsAddressModalOpen(false)}
        onSelect={handleSelectAddress}
      />
    </>
  );
}
