import type { IUsePaginationDesktopProps } from "../../types";

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((firstPage, secondPage) => firstPage - secondPage);
}

export function usePaginationDesktop({
  currentPage,
  totalPages,
}: IUsePaginationDesktopProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return {
    visiblePages,
  };
}
