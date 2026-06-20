import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "../../../utils/mergeClass";
import { Button } from "../button";
import type { ButtonProps } from "../button/types";
import type { PaginationLinkProps } from "./types";

export function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Paginação"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row flex-wrap items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem(props: ComponentProps<"li">) {
  return <li {...props} />;
}

export function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      variant={isActive ? "primary" : "outline"}
      size="sm"
      className={cn("size-11 cursor-pointer px-0", className)}
      {...props}
    />
  );
}

export function PaginationPrevious({
  className,
  children = "Anterior",
  ...props
}: ButtonProps) {
  return (
    <PaginationLink
      aria-label="Página anterior"
      className={cn("w-full", className)}
      {...props}
    >
      <ChevronLeft size={18} />
      {children}
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  children = "Próxima",
  ...props
}: ButtonProps) {
  return (
    <PaginationLink
      aria-label="Próxima página"
      className={cn("w-full", className)}
      {...props}
    >
      {children}
      <ChevronRight size={18} />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-11 items-center justify-center text-slate-400",
        className,
      )}
      {...props}
    >
      <MoreHorizontal size={18} />
    </span>
  );
}
