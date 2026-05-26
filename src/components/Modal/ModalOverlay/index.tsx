import { cn } from "../../../utils/mergeClass";
import type { IModalOverlayProps } from "./types";

export function ModalOverlay({
  className,
  onClick,
}: IModalOverlayProps) {
  return (
    <button
      type="button"
      aria-label="Fechar modal"
      onClick={onClick}
      className={cn(
        "absolute inset-0 h-full w-full cursor-default bg-black/55",
        className,
      )}
    />
  );
}
