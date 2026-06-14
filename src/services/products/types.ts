export type ProductsProps = {
  id: number;
  name: string;
  description: string;
  value: number;
  imageUrl: string;
  categoriesId: number;
  catalogClientId: number;
  categoryName?: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginationResponse = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export interface IGetProductsRequest {
  page?: number;
  limit?: number;
  catalogClientName: string;
  categoria?: number | null;
}

export interface IGetProductsResponse {
  data: {
    products: ProductsProps[];
    pagination: PaginationResponse;
  };
}
