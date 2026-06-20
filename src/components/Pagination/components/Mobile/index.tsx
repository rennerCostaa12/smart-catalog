import { Button } from "../../../ui/button";
import type { IPaginationProps } from "../../types";
import { usePaginationMobile } from "./usePaginationMobile";

export function PaginationMobile({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  isLoadingMore = false,
}: IPaginationProps) {
  const { hasNextPage } = usePaginationMobile({ currentPage, totalPages });

  if (!hasNextPage) {
    return null;
  }

  return (
    <Button
      fullWidth
      variant="outline"
      isLoading={isLoadingMore}
      disabled={disabled}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Ver Mais
    </Button>
  );
}
