import { useCallback, useEffect, useRef } from "react";

type Callback<T extends unknown[]> = (...args: T) => void;
type DebouncedFunction<T extends unknown[]> = ((...args: T) => void) & {
  cancel: () => void;
};

export function useDebounceFn<T extends unknown[]>(
  callback: Callback<T>,
  delay: number,
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const debounce = useCallback(
    (...args: T) => {
      cancel();

      timeoutRef.current = setTimeout(() => {
        callback(...args);
        timeoutRef.current = null;
      }, delay);
    },
    [callback, cancel, delay],
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return Object.assign(debounce, { cancel }) as DebouncedFunction<T>;
}
