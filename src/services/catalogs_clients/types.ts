export type CatalogClient = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CatalogClientsResponse = {
  data: CatalogClient;
};

export type CatalogClientsRequest = {
  slug: string;
};
