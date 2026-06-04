import { cn } from "../../../../utils/mergeClass";
import { Mask } from "../../../../utils/mask";
import { Tab } from "../../../Tab";
import { Input } from "../../../ui/input";
import { Typography } from "../../../ui/typography";
import { MethodPaymentEnum, type IMethodPaymentProps } from "./types";

export function MethodPayment({
  className,
  value,
  onValueChange,
  cardValues,
  cardErrors,
  onCardValueChange,
}: IMethodPaymentProps) {
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
        defaultValue="cartao"
        value={value}
        onValueChange={(nextValue) =>
          onValueChange(nextValue as MethodPaymentEnum)
        }
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
              <Input
                inputSize="sm"
                label="Nome do titular"
                placeholder="Nome impresso no cartão"
                value={cardValues.cardHolderName}
                error={cardErrors?.cardHolderName}
                onChange={(event) =>
                  onCardValueChange("cardHolderName", event.target.value)
                }
              />

              <Input
                inputSize="sm"
                label="Número"
                placeholder="0000 0000 0000 0000"
                value={cardValues.cardNumber}
                error={cardErrors?.cardNumber}
                inputMode="numeric"
                onChange={(event) =>
                  onCardValueChange(
                    "cardNumber",
                    Mask.cardNumber(event.target.value),
                  )
                }
              />

              <Input
                inputSize="sm"
                label="Mês de expiração"
                placeholder="MM"
                value={cardValues.expirationMonth}
                error={cardErrors?.expirationMonth}
                inputMode="numeric"
                onChange={(event) =>
                  onCardValueChange(
                    "expirationMonth",
                    Mask.numeric(event.target.value, 2),
                  )
                }
              />

              <Input
                inputSize="sm"
                label="Ano de expiração"
                placeholder="AAAA"
                value={cardValues.expirationYear}
                error={cardErrors?.expirationYear}
                inputMode="numeric"
                onChange={(event) =>
                  onCardValueChange(
                    "expirationYear",
                    Mask.numeric(event.target.value, 4),
                  )
                }
              />

              <Input
                inputSize="sm"
                label="CVV"
                placeholder="000"
                value={cardValues.cvv}
                error={cardErrors?.cvv}
                inputMode="numeric"
                type="password"
                onChange={(event) =>
                  onCardValueChange("cvv", Mask.numeric(event.target.value, 4))
                }
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-soft p-3">
            <Typography weight="bold">Informações do titular</Typography>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Input
                inputSize="sm"
                label="Nome"
                placeholder="Nome completo"
                value={cardValues.holderName}
                error={cardErrors?.holderName}
                onChange={(event) =>
                  onCardValueChange("holderName", event.target.value)
                }
              />

              <Input
                inputSize="sm"
                label="Email"
                placeholder="email@exemplo.com"
                value={cardValues.holderEmail}
                error={cardErrors?.holderEmail}
                type="email"
                onChange={(event) =>
                  onCardValueChange("holderEmail", event.target.value)
                }
              />

              <Input
                inputSize="sm"
                label="Documento"
                placeholder="CPF ou CNPJ"
                value={cardValues.holderDocument}
                error={cardErrors?.holderDocument}
                inputMode="numeric"
                onChange={(event) =>
                  onCardValueChange(
                    "holderDocument",
                    Mask.document(event.target.value),
                  )
                }
              />

              <Input
                inputSize="sm"
                label="CEP"
                placeholder="00000-000"
                value={cardValues.holderZipCode}
                error={cardErrors?.holderZipCode}
                inputMode="numeric"
                onChange={(event) =>
                  onCardValueChange(
                    "holderZipCode",
                    Mask.zipCode(event.target.value),
                  )
                }
              />

              <Input
                inputSize="sm"
                label="Número de endereço"
                placeholder="Número"
                value={cardValues.holderAddressNumber}
                error={cardErrors?.holderAddressNumber}
                inputMode="numeric"
                onChange={(event) =>
                  onCardValueChange(
                    "holderAddressNumber",
                    Mask.numeric(event.target.value, 8),
                  )
                }
              />

              <Input
                inputSize="sm"
                label="Telefone"
                placeholder="(00) 00000-0000"
                value={cardValues.holderPhone}
                error={cardErrors?.holderPhone}
                inputMode="tel"
                onChange={(event) =>
                  onCardValueChange(
                    "holderPhone",
                    Mask.phone(event.target.value),
                  )
                }
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
