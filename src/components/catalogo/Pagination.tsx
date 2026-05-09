"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipsis
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const delta = 1; // Pages to show around current

    // Always show first page
    pages.push(1);

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (rangeStart > 2) {
      pages.push("ellipsis");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav aria-label="Paginación del catálogo" className="flex justify-center">
      <ul className="flex items-center gap-1">
        {/* Previous */}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={cn(
              "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-sm font-medium transition-colors",
              currentPage <= 1
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-600 hover:bg-gray-100"
            )}
            aria-label="Página anterior"
          >
            <span
              className="material-symbols-outlined text-lg"
              aria-hidden="true"
            >
              chevron_left
            </span>
          </button>
        </li>

        {/* Page Numbers */}
        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <li key={`ellipsis-${idx}`} aria-hidden="true">
              <span className="flex min-h-[44px] min-w-[36px] items-center justify-center text-sm text-gray-400">
                …
              </span>
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={currentPage === p ? "page" : undefined}
                className={cn(
                  "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-sm font-medium transition-colors",
                  currentPage === p
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {p}
              </button>
            </li>
          )
        )}

        {/* Next */}
        <li>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={cn(
              "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-sm font-medium transition-colors",
              currentPage >= totalPages
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-600 hover:bg-gray-100"
            )}
            aria-label="Página siguiente"
          >
            <span
              className="material-symbols-outlined text-lg"
              aria-hidden="true"
            >
              chevron_right
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
