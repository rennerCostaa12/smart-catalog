import { queryOptions } from "@tanstack/react-query";

import { catalogsClientsService } from ".";
import type { CatalogClient } from "./types";
import { CATALOG_CLIENT_STORAGE_KEY } from "./constants";

function getStoredCatalogClient(slug: string): CatalogClient | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const storedValue = window.localStorage.getItem(CATALOG_CLIENT_STORAGE_KEY);

    if (!storedValue) {
      return undefined;
    }

    const catalogClient = JSON.parse(storedValue);

    if (catalogClient.slug !== slug) {
      return undefined;
    }

    return catalogClient as CatalogClient;
  } catch {
    return undefined;
  }
}

export const catalogClientQueryKeys = {
  all: ["catalog-clients"] as const,
  detail: (slug: string) => [...catalogClientQueryKeys.all, slug] as const,
};

export function catalogClientQueryOptions(slug: string) {
  const storedCatalogClient = getStoredCatalogClient(slug);

  return queryOptions({
    queryKey: catalogClientQueryKeys.detail(slug),
    queryFn: async () => {
      if (storedCatalogClient) {
        return storedCatalogClient;
      }

      const response = await catalogsClientsService.getCatalogClientBySlug({
        slug,
      });

      return response.data;
    },
    initialData: storedCatalogClient,
    enabled: Boolean(slug) && !storedCatalogClient,
  });
}
