import { useState } from "react";
import { cn } from "../../../utils/mergeClass";
import { TabProvider } from "../TabContext";
import type { ITabRootProps } from "./types";

export function TabRoot({
  children,
  defaultValue,
  value,
  onValueChange,
  className,
}: ITabRootProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  function handleSetValue(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  return (
    <TabProvider value={currentValue} setValue={handleSetValue}>
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </TabProvider>
  );
}
