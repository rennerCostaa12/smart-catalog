import { useContext } from "react";

import { CatalogClientContext } from ".";

export function useCatalogClient() {
  const context = useContext(CatalogClientContext);

  if (!context) {
    throw new Error(
      "useCatalogClient precisa estar englobado pelo CatalogClientProvider",
    );
  }

  return context;
}
