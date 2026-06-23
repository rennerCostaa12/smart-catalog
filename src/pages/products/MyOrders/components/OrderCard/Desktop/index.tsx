import { ChevronRight, ClipboardList } from "lucide-react";

import { StatusBadge } from "../../../../../../components/StatusBadge";
import { Button } from "../../../../../../components/ui/button";
import { Typography } from "../../../../../../components/ui/typography";
import type { IOrderCardProps } from "../types";

export function OrderCardDesktop({ order, onDetails }: IOrderCardProps) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 md:h-16 md:w-16">
              <ClipboardList size={26} />
            </div>

            <div className="w-full">
              <Typography variant="body" weight="bold">
                Pedido <br /> {order?.id}
              </Typography>
              <Typography color="muted">{order?.date}</Typography>
            </div>
          </div>

          <StatusBadge status={order?.status} />
        </div>

        <div className="flex items-center gap-4">
          <div className="border-l border-slate-200 pl-6">
            <Typography variant="bodySmall" color="muted">
              Total
            </Typography>
            <Typography className="mt-1" variant="h3" weight="bold">
              {order?.total}
            </Typography>
          </div>

          <Button
            className="cursor-pointer"
            variant="outline"
            rightIcon={<ChevronRight size={18} />}
            onClick={() => onDetails(order)}
          >
            Ver detalhes
          </Button>
        </div>
      </div>
    </div>
  );
}
