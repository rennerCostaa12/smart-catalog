import { Check, MapPin } from "lucide-react";

import { Modal } from "../../../../../Modal";
import { Button } from "../../../../../ui/button";
import { Typography } from "../../../../../ui/typography";
import { cn } from "../../../../../../utils/mergeClass";
import type { IAddressSelectionModalProps } from "./types";
import { formatUserAddress } from "../../../../../../utils/formatUserAddress";

export function AddressSelectionModal({
  open,
  addresses,
  selectedAddressId,
  onClose,
  onSelect,
}: IAddressSelectionModalProps) {
  return (
    <Modal.Root open={open}>
      <Modal.Overlay onClick={onClose} />
      <Modal.Content>
        <section className="relative z-10 max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-white p-5 shadow-xl">
          <Modal.CloseButton onClick={onClose} />

          <div className="pr-12">
            <Typography variant="h4">Alterar endereco</Typography>
            <Typography className="mt-1" variant="bodySmall" color="muted">
              Escolha o endereco para receber este pedido.
            </Typography>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {addresses.map((address) => {
              const isSelected = selectedAddressId === address.id;

              return (
                <button
                  key={address.id}
                  type="button"
                  className={cn(
                    "flex w-full cursor-pointer gap-3 rounded-xl border bg-white p-3 text-left transition",
                    isSelected
                      ? "border-primary bg-primary-light"
                      : "border-border hover:border-primary-light hover:bg-slate-50",
                  )}
                  onClick={() => onSelect(address)}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-blue-50 text-blue-700",
                    )}
                  >
                    {isSelected ? <Check size={18} /> : <MapPin size={18} />}
                  </span>

                  <span className="min-w-0 flex-1">
                    <Typography variant="bodySmall" weight="bold">
                      {address.label}
                    </Typography>

                    <Typography variant="bodySmall" color="muted">
                      {formatUserAddress(address)}
                    </Typography>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex justify-end border-t border-slate-200 pt-4">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={onClose}
            >
              Fechar
            </Button>
          </div>
        </section>
      </Modal.Content>
    </Modal.Root>
  );
}
