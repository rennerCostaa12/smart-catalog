import { cn } from "../../../utils/mergeClass";
import type { IModalContentProps } from "./types";

export function ModalContent({
  children,
  className,
}: IModalContentProps) {
  return (
    <div
      className={cn(
        "z-10 mx-auto flex min-h-full w-full items-center justify-center p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
