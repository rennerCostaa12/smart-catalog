import { cn } from "../../../utils/mergeClass";
import { useTabContext } from "../TabContext";
import type { ITabContentProps } from "./types";

export function TabContent({
  children,
  value,
  className,
}: ITabContentProps) {
  const { value: activeValue } = useTabContext();

  if (activeValue !== value) {
    return null;
  }

  return (
    <div role="tabpanel" className={cn("w-full", className)}>
      {children}
    </div>
  );
}
