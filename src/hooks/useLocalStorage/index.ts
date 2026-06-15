import { useCallback } from "react";

export function useLocalStorage(key: string) {
  const get = useCallback(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    try {
      const value = window.localStorage.getItem(key);

      return value ? JSON.parse(value) : undefined;
    } catch {
      try {
        window.localStorage.removeItem(key);
      } catch {
        return undefined;
      }

      return undefined;
    }
  }, [key]);

  const setter = useCallback(
    (value: unknown) => {
      if (typeof window === "undefined") {
        return false;
      }

      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
    [key],
  );

  return { get, setter };
}
