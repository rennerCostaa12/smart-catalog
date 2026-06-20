export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  isLoadingMore?: boolean;
}

export interface IUsePaginationMobileProps {
  currentPage: number;
  totalPages: number;
}

export interface IUsePaginationDesktopProps {
  currentPage: number;
  totalPages: number;
}
