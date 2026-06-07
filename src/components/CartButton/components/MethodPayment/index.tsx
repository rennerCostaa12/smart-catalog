import { Controller, useController } from "react-hook-form";

import { cn } from "../../../../utils/mergeClass";
import { Mask } from "../../../../utils/mask";
import { Tab } from "../../../Tab";
import { Input } from "../../../ui/input";
import { Typography } from "../../../ui/typography";
import { MethodPaymentEnum, type IMethodPaymentProps } from "./types";

export function MethodPayment({ className, control }: IMethodPaymentProps) {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name: "methodPayment",
  });

  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-white p-4 shadow-sm",
        className,
      )}
    >
      <div className="mb-4">
        <Typography weight="bold">Método de pagamento</Typography>

        <Typography variant="bodySmall" color="muted">
          Escolha como deseja concluir o pagamento.
        </Typography>
      </div>

      <Tab.Root
        defaultValue={MethodPaymentEnum.CARD}
        value={value}
        onValueChange={(nextValue) => onChange(nextValue as MethodPaymentEnum)}
      >
        <Tab.List className="w-full">
          <Tab.Trigger className="flex-1" value={MethodPaymentEnum.CARD}>
            Cartão
          </Tab.Trigger>

          <Tab.Trigger className="flex-1" value={MethodPaymentEnum.PIX}>
            Pix
          </Tab.Trigger>
        </Tab.List>
      </Tab.Root>

      {value === MethodPaymentEnum.CARD && (
        <div className="mt-4 flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-surface-soft p-3">
            <Typography weight="bold">
              Informações do cartão de crédito
            </Typography>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Controller
                control={control}
                name="cardHolderName"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="Nome do titular"
                    placeholder="Nome impresso no cartão"
                    value={field.value}
                    error={error?.message}
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="cardNumber"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="Número"
                    placeholder="0000 0000 0000 0000"
                    value={field.value}
                    error={error?.message}
                    inputMode="numeric"
                    onChange={(event) =>
                      field.onChange(Mask.cardNumber(event.target.value))
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="expirationMonth"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="Mês de expiração"
                    placeholder="MM"
                    value={field.value}
                    error={error?.message}
                    inputMode="numeric"
                    onChange={(event) =>
                      field.onChange(Mask.numeric(event.target.value, 2))
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="expirationYear"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="Ano de expiração"
                    placeholder="AAAA"
                    value={field.value}
                    error={error?.message}
                    inputMode="numeric"
                    onChange={(event) =>
                      field.onChange(Mask.numeric(event.target.value, 4))
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="cvv"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="CVV"
                    placeholder="000"
                    value={field.value}
                    error={error?.message}
                    inputMode="numeric"
                    type="password"
                    onChange={(event) =>
                      field.onChange(Mask.numeric(event.target.value, 4))
                    }
                  />
                )}
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-soft p-3">
            <Typography weight="bold">Informações do titular</Typography>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Controller
                control={control}
                name="holderName"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="Nome"
                    placeholder="Nome completo"
                    value={field.value}
                    error={error?.message}
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="holderEmail"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="Email"
                    placeholder="email@exemplo.com"
                    value={field.value}
                    error={error?.message}
                    type="email"
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="holderDocument"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="Documento"
                    placeholder="CPF ou CNPJ"
                    value={field.value}
                    error={error?.message}
                    inputMode="numeric"
                    onChange={(event) =>
                      field.onChange(Mask.document(event.target.value))
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="holderZipCode"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="CEP"
                    placeholder="00000-000"
                    value={field.value}
                    error={error?.message}
                    inputMode="numeric"
                    onChange={(event) =>
                      field.onChange(Mask.zipCode(event.target.value))
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="holderAddressNumber"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="Número de endereço"
                    placeholder="Número"
                    value={field.value}
                    error={error?.message}
                    inputMode="numeric"
                    onChange={(event) =>
                      field.onChange(Mask.numeric(event.target.value, 8))
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="holderPhone"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    inputSize="sm"
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    value={field.value}
                    error={error?.message}
                    inputMode="tel"
                    onChange={(event) =>
                      field.onChange(Mask.phone(event.target.value))
                    }
                  />
                )}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
