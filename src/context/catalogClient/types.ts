import type { ReactNode } from "react";

import type { CatalogClient } from "../../services/catalogs_clients";

export type CatalogClientContextData = {
  isFetching: boolean;
  refetch: () => void;
  getInfoCatalogClient: () => CatalogClient | undefined;
};

export type CatalogClientProviderProps = {
  children: ReactNode;
};
