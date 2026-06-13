import { ClipboardList } from "lucide-react";

import { Typography } from "../../../components/ui/typography";

import { useMyOrders } from "./useMyOrders";

export function MyOrdersPage() {
  const {} = useMyOrders();

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-2">
        <Typography variant="h1">Meus pedidos</Typography>
        <Typography variant="body" color="muted">
          Acompanhe o histórico e o status dos seus pedidos.
        </Typography>
      </div>

      <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-soft p-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-surface text-primary shadow-sm">
          <ClipboardList size={26} />
        </div>

        <Typography className="mt-4" weight="bold">
          Nenhum pedido encontrado
        </Typography>

        <Typography
          className="mt-2 max-w-md"
          variant="bodySmall"
          color="muted"
          align="center"
        >
          Seus pedidos aparecerão aqui depois que uma compra for finalizada.
        </Typography>
      </div>
    </div>
  );
}
