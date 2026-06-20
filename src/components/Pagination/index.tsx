import { useMobile } from "../../hooks/useMobile";
import { PAGINATION_MOBILE_BREAKPOINT } from "./constants";
import { PaginationDesktop } from "./components/Desktop";
import { PaginationMobile } from "./components/Mobile";
import type { IPaginationProps } from "./types";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  isLoadingMore = false,
}: IPaginationProps) {
  const isMobile = useMobile({ breakpoint: PAGINATION_MOBILE_BREAKPOINT });

  if (totalPages <= 1) {
    return null;
  }

  if (isMobile) {
    return (
      <PaginationMobile
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        disabled={disabled}
        isLoadingMore={isLoadingMore}
      />
    );
  }

  return (
    <PaginationDesktop
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      disabled={disabled}
    />
  );
}
