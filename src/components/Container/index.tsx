import { cn } from "../../utils/mergeClass";
import type { ContainerProps } from "./types";

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full", className)} {...props}>
      {children}
    </div>
  );
}
