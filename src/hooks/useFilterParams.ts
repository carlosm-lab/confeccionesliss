"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

interface UseFilterParamsOptions {
  /** Items per page for pagination */
  pageSize?: number;
}

interface UseFilterParamsReturn {
  /** Current search query */
  query: string;
  /** Active filters as Record<groupKey, values[]> */
  filters: Record<string, string[]>;
  /** Current sort key */
  sort: string;
  /** Current page (1-indexed) */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Set the search query */
  setQuery: (q: string) => void;
  /** Toggle a filter value within a group */
  toggleFilter: (group: string, value: string) => void;
  /** Set all values for a filter group */
  setFilterGroup: (group: string, values: string[]) => void;
  /** Clear all filters, query, and reset page */
  clearAll: () => void;
  /** Set sort key */
  setSort: (s: string) => void;
  /** Set page number */
  setPage: (p: number) => void;
  /** Whether any filter or query is active */
  hasActiveFilters: boolean;
}

/**
 * Syncs catalog filters, search, sort, and pagination with URL search params.
 *
 * URL shape: /catalogo?q=scrub&sector=salud&tipo=scrubs,gorros&talla=M,L&sort=price-asc&page=2
 */
export function useFilterParams(
  opts: UseFilterParamsOptions = {}
): UseFilterParamsReturn {
  const { pageSize = 12 } = opts;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse current state from URL
  const query = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "relevance";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  // Parse filter groups from URL (comma-separated values)
  const filters = useMemo(() => {
    const result: Record<string, string[]> = {};
    const filterKeys = ["sector", "tipo", "talla", "categoria"];
    for (const key of filterKeys) {
      const val = searchParams.get(key);
      if (val) {
        result[key] = val.split(",").filter(Boolean);
      }
    }
    return result;
  }, [searchParams]);

  const hasActiveFilters = useMemo(() => {
    return (
      query.length > 0 || Object.values(filters).some((vals) => vals.length > 0)
    );
  }, [query, filters]);

  // Helper to update URL params immutably
  const updateParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      updater(params);
      // Clean up empty params
      for (const [key, value] of Array.from(params.entries())) {
        if (!value) params.delete(key);
      }
      const search = params.toString();
      router.replace(`${pathname}${search ? `?${search}` : ""}`, {
        scroll: false,
      });
    },
    [searchParams, router, pathname]
  );

  const setQuery = useCallback(
    (q: string) => {
      updateParams((params) => {
        if (q) {
          params.set("q", q);
        } else {
          params.delete("q");
        }
        params.delete("page"); // Reset page on query change
      });
    },
    [updateParams]
  );

  const toggleFilter = useCallback(
    (group: string, value: string) => {
      updateParams((params) => {
        const current = params.get(group)?.split(",").filter(Boolean) ?? [];
        const idx = current.indexOf(value);
        if (idx >= 0) {
          current.splice(idx, 1);
        } else {
          current.push(value);
        }
        if (current.length > 0) {
          params.set(group, current.join(","));
        } else {
          params.delete(group);
        }
        params.delete("page"); // Reset page on filter change
      });
    },
    [updateParams]
  );

  const setFilterGroup = useCallback(
    (group: string, values: string[]) => {
      updateParams((params) => {
        if (values.length > 0) {
          params.set(group, values.join(","));
        } else {
          params.delete(group);
        }
        params.delete("page");
      });
    },
    [updateParams]
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const setSort = useCallback(
    (s: string) => {
      updateParams((params) => {
        if (s && s !== "relevance") {
          params.set("sort", s);
        } else {
          params.delete("sort");
        }
        params.delete("page");
      });
    },
    [updateParams]
  );

  const setPage = useCallback(
    (p: number) => {
      updateParams((params) => {
        if (p > 1) {
          params.set("page", String(p));
        } else {
          params.delete("page");
        }
      });
    },
    [updateParams]
  );

  return {
    query,
    filters,
    sort,
    page,
    pageSize,
    setQuery,
    toggleFilter,
    setFilterGroup,
    clearAll,
    setSort,
    setPage,
    hasActiveFilters,
  };
}
