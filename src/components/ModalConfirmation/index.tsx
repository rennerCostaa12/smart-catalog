import { Modal } from "../Modal";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import type { IModalConfirmationProps } from "./types";

export function ModalConfirmation({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  labelConfirm,
  labelCancel,
  isLoading,
  variantButtonConfirm = "danger",
}: IModalConfirmationProps) {
  return (
    <Modal.Root open={open}>
      <Modal.Overlay onClick={onCancel} />

      <Modal.Content className="p-4">
        <section className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl">
          <Modal.CloseButton onClick={onCancel} />

          <div className="pr-12">
            <Typography variant="h4">{title}</Typography>

            {description && (
              <Typography variant="body" color="muted" className="mt-2">
                {description}
              </Typography>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={onCancel}
              disabled={isLoading}
            >
              {labelCancel}
            </Button>

            <Button
              type="button"
              variant={variantButtonConfirm}
              className="cursor-pointer"
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {labelConfirm}
            </Button>
          </div>
        </section>
      </Modal.Content>
    </Modal.Root>
  );
}
