import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect } from "react";
import { useParams } from "react-router";

import type { CatalogClient } from "../../services/catalogs_clients";

import { Button } from "../../components/ui/button";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { Typography } from "../../components/ui/typography";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { catalogClientQueryOptions } from "../../services/catalogs_clients/queries";
import type {
  CatalogClientContextData,
  CatalogClientProviderProps,
} from "./types";
import { CATALOG_CLIENT_STORAGE_KEY } from "../../services/catalogs_clients/constants";

export const CatalogClientContext =
  createContext<CatalogClientContextData | null>(null);

export function CatalogClientProvider({
  children,
}: CatalogClientProviderProps) {
  const { catalogClientName = "" } = useParams();
  const { get: getCatalogClient, setter: setCatalogClient } = useLocalStorage(
    CATALOG_CLIENT_STORAGE_KEY,
  );

  const getInfoCatalogClient = (): CatalogClient | undefined => {
    const responseCatalogClient = getCatalogClient() as
      | CatalogClient
      | undefined;

    if (responseCatalogClient) {
      return responseCatalogClient;
    }

    return undefined;
  };

  const queryOptions = catalogClientQueryOptions(catalogClientName);

  const {
    data: catalogClient,
    error,
    isFetching,
    isPending,
    refetch,
  } = useQuery(queryOptions);

  useEffect(() => {
    if (catalogClient) {
      setCatalogClient(catalogClient);
    }
  }, [catalogClient, setCatalogClient]);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner />
      </main>
    );
  }

  if (!catalogClient) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Typography weight="bold">
            Não foi possível carregar o catálogo.
          </Typography>

          <Typography color="muted">
            {error instanceof Error
              ? error.message
              : "Catálogo não encontrado."}
          </Typography>

          <Button variant="outline" onClick={() => refetch()}>
            Tentar novamente
          </Button>
        </div>
      </main>
    );
  }

  return (
    <CatalogClientContext.Provider
      value={{
        isFetching,
        refetch: () => {
          void refetch();
        },
        getInfoCatalogClient,
      }}
    >
      {children}
    </CatalogClientContext.Provider>
  );
}
