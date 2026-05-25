import { cn } from "../../../utils/mergeClass";
import { useTabContext } from "../TabContext";
import type { ITabTriggerProps } from "./types";

export function TabTrigger({
  children,
  value,
  className,
}: ITabTriggerProps) {
  const { value: activeValue, setValue } = useTabContext();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
        "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-white"
          : "text-text hover:bg-primary-light hover:text-primary-dark",
        className,
      )}
      onClick={() => setValue(value)}
    >
      {children}
    </button>
  );
}
