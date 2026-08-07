import type { ReactNode } from "react";
import { AuthProvider } from "../context/auth";
import { CartProvider } from "../context/cart";
import { QueryProvider } from "./QueryProvider";
import { CatalogClientProvider } from "../context/catalogClient";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <CatalogClientProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </CatalogClientProvider>
    </QueryProvider>
  );
}
