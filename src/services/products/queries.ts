import { queryOptions } from "@tanstack/react-query";

import { productsServices } from ".";
import type { IGetProductsRequest } from "./types";

export const productsQueryKeys = {
  all: ["products"],
  list: (params: IGetProductsRequest) => [
    ...productsQueryKeys.all,
    "list",
    params,
  ],
};

export function productsQueryOptions(params: IGetProductsRequest) {
  return queryOptions({
    queryKey: productsQueryKeys.list(params),
    queryFn: () => productsServices.getProducts(params),
    enabled: Boolean(params.catalogClientName),
  });
}
