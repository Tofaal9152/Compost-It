import { useInfiniteQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/request";

type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

type PaginatedResponse<T> = {
  requests: T[];
  pagination: Pagination;
};

export function useInfiniteData<T>(
  path: string,
  queryKey: string | readonly unknown[]
) {
  return useInfiniteQuery<PaginatedResponse<T>, Error>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: ({ pageParam = 1 }) => {
      const separator = path.includes("?") ? "&" : "?";
      const url = `${path}${separator}page=${pageParam}&limit=10`;
      return fetcher<PaginatedResponse<T>>(url);
    },

    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
  });
  
}
