import type { UnauthorizedListener } from "./types";

const unauthorizedListeners = new Set<UnauthorizedListener>();

export function subscribeUnauthorized(listener: UnauthorizedListener) {
  unauthorizedListeners.add(listener);

  return () => {
    unauthorizedListeners.delete(listener);
  };
}

export function notifyUnauthorized() {
  unauthorizedListeners.forEach((listener) => listener());
}
