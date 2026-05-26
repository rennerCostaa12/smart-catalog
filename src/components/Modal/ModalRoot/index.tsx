import { cn } from "../../../utils/mergeClass";
import type { IModalRootProps } from "./types";

export function ModalRoot({
  children,
  open = false,
  className,
}: IModalRootProps) {
  if (!open) {
    return null;
  }

  return (
    <div className={cn("fixed inset-0 z-50", className)}>
      {children}
    </div>
  );
}
