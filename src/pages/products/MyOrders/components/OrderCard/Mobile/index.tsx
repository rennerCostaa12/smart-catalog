import { ChevronRight, ClipboardList } from "lucide-react";

import { StatusBadge } from "../../../../../../components/StatusBadge";
import { Typography } from "../../../../../../components/ui/typography";
import type { IOrderCardProps } from "../types";

export function OrderCardMobile({ order, onDetails }: IOrderCardProps) {
  return (
    <button
      type="button"
      onClick={() => onDetails(order)}
      className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600">
          <ClipboardList size={24} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Typography className="truncate" variant="body" weight="bold">
                Pedido {order?.id}
              </Typography>
              <Typography variant="bodySmall" color="muted">
                {order?.date}
              </Typography>
            </div>

            <ChevronRight className="shrink-0 text-slate-500" size={20} />
          </div>

          <div className="mt-3 flex items-end justify-between gap-3 border-t border-slate-200 pt-3">
            <StatusBadge status={order?.status} />

            <div className="text-right">
              <Typography variant="bodySmall" color="muted">
                Total
              </Typography>
              <Typography variant="body" weight="bold">
                {order?.total}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
