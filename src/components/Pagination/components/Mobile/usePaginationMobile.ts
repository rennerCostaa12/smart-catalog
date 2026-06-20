import type { IUsePaginationMobileProps } from "../../types";

export function usePaginationMobile({
  currentPage,
  totalPages,
}: IUsePaginationMobileProps) {
  const hasNextPage = currentPage < totalPages;

  return {
    hasNextPage,
  };
}
