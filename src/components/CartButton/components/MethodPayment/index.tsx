import { Mask } from "../../../../utils/mask";
import { cn } from "../../../../utils/mergeClass";
import { Tab } from "../../../Tab";
import { Input } from "../../../ui/input";
import { Typography } from "../../../ui/typography";
import { MethodPaymentEnum, type IMethodPaymentProps } from "./types";

export function MethodPayment({
  className,
  value,
  onValueChange,
  cashChangeValue,
  onCashChangeValue,
  cashChangeError,
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

          <Tab.Trigger className="flex-1" value={MethodPaymentEnum.MONEY}>
            Dinheiro
          </Tab.Trigger>
        </Tab.List>
      </Tab.Root>

      {value === MethodPaymentEnum.MONEY && (
        <div className="mt-4">
          <Input
            inputSize="sm"
            label="Troco para quanto?"
            placeholder="R$ 0,00"
            value={cashChangeValue}
            error={cashChangeError}
            onChange={(event) =>
              onCashChangeValue(Mask.currencyBRL(event.target.value))
            }
          />
        </div>
      )}
    </section>
  );
}
