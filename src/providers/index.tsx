import type { ReactNode } from "react";
import { AuthProvider } from "../context/auth";
import { CartProvider } from "../context/cart";
import { QueryProvider } from "./QueryProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
