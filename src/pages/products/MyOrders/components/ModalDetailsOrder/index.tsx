import { PackageOpen, ShoppingBag } from "lucide-react";

import { Modal } from "../../../../../components/Modal";
import { StatusBadge } from "../../../../../components/StatusBadge";
import { Button } from "../../../../../components/ui/button";
import { Typography } from "../../../../../components/ui/typography";
import type { IModalDetailsOrderProps } from "./types";

export function ModalDetailsOrder({
  open,
  order,
  onClose,
}: IModalDetailsOrderProps) {
  if (!order) {
    return null;
  }

  const hasItems = order?.items?.length > 0;

  return (
    <Modal.Root open={open}>
      <Modal.Overlay onClick={onClose} />

      <Modal.Content className="p-4">
        <section className="relative z-10 max-h-[calc(100vh-2rem)] min-h-[70vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-white shadow-xl sm:min-h-0">
          <Modal.CloseButton onClick={onClose} className="hidden max-sm:flex" />
          <div className="flex flex-col gap-5 p-5 sm:p-6">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="max-sm:hidden flex size-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-blue-600">
                  <ShoppingBag size={20} />
                </div>

                <div className="min-w-0">
                  <Typography variant="h4">Pedido {order?.id}</Typography>
                  <Typography variant="bodySmall" color="muted">
                    {order?.date}
                  </Typography>
                </div>
              </div>

              <div className="flex flex-wrap max-sm:flex-col items-center gap-3 sm:justify-end">
                <StatusBadge status={order?.status} />

                <div className="flex gap-4 max-sm:flex-col w-full">
                  <div className="rounded-xl border border-slate-200 px-3 py-2 max-sm:w-full">
                    <Typography variant="caption" color="muted">
                      Pagamento
                    </Typography>
                    <Typography variant="body" weight="bold">
                      {order?.methodPayment?.toLocaleUpperCase()}
                    </Typography>
                  </div>

                  <div className="rounded-xl border border-slate-200 px-3 py-2 max-sm:w-full">
                    <Typography variant="caption" color="muted">
                      Entrega
                    </Typography>
                    <Typography variant="body" weight="bold">
                      {order?.deliveryMethod?.toLocaleUpperCase()}
                    </Typography>
                  </div>

                  <div className="rounded-xl border border-slate-200 px-3 py-2 max-sm:w-full">
                    <Typography variant="caption" color="muted">
                      Total
                    </Typography>
                    <Typography variant="body" weight="bold">
                      {order?.total}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Typography variant="body" weight="bold">
                Itens do pedido
              </Typography>

              {!hasItems && (
                <div className="mt-4 flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                  <PackageOpen className="text-slate-400" size={36} />
                  <Typography className="mt-3" variant="body" weight="bold">
                    Nenhum item encontrado
                  </Typography>
                  <Typography variant="bodySmall" color="muted">
                    A lista de itens nao foi enviada para este pedido.
                  </Typography>
                </div>
              )}

              {hasItems && (
                <div className="mt-4 max-h-[45vh] space-y-3 overflow-y-auto pr-1">
                  {order?.items.map((item, index) => (
                    <article
                      key={index}
                      className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                    >
                      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-400">
                        {item?.image ? (
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <PackageOpen size={24} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <Typography
                              className="truncate"
                              variant="body"
                              weight="bold"
                            >
                              {item?.name}
                            </Typography>
                            <Typography variant="bodySmall" color="muted">
                              Quantidade: {item?.quantity}
                            </Typography>
                          </div>

                          <div className="shrink-0 text-left sm:text-right">
                            <Typography variant="caption" color="muted">
                              Subtotal
                            </Typography>
                            <Typography variant="body" weight="bold">
                              {item?.subtotal}
                            </Typography>
                          </div>
                        </div>

                        <Typography
                          className="mt-2"
                          variant="bodySmall"
                          color="muted"
                        >
                          Valor unitario: {item?.unitPrice}
                        </Typography>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-slate-200 pt-5">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={onClose}
              >
                Fechar
              </Button>
            </div>
          </div>
        </section>
      </Modal.Content>
    </Modal.Root>
  );
}
