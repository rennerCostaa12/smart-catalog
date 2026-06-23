import { ClipboardList } from "lucide-react";

import { Typography } from "../../../../../components/ui/typography";

export function EmptyOrders() {
  return (
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
  );
}
