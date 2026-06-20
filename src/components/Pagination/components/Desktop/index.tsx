import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../ui/pagination";
import { type IPaginationProps } from "../../types";
import { usePaginationDesktop } from "./usePaginationDesktop";

export function PaginationDesktop({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: IPaginationProps) {
  const { visiblePages } = usePaginationDesktop({ currentPage, totalPages });

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="gap-0"
            disabled={disabled || currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const hasGap = previousPage && page - previousPage > 1;

          return (
            <PaginationItem className="contents" key={page}>
              {hasGap && <PaginationEllipsis />}

              <PaginationLink
                aria-label={`Ir para página ${page}`}
                isActive={page === currentPage}
                disabled={disabled}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            className="gap-0"
            disabled={disabled || currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
