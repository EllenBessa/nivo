import { useSearchParams } from "react-router-dom";

interface UsePaginationParams {
  pages: number;
  page: number;
}

export function usePagination({ page, pages }: UsePaginationParams) {
  const [, setSearchParams] = useSearchParams();

  function firstPage() {
    setSearchParams((params) => {
      params.set("page", "1");

      return params;
    });
  }

  function previousPage() {
    if (page - 1 <= 0) {
      return;
    }

    setSearchParams((params) => {
      params.set("page", String(page - 1));

      return params;
    });
  }

  function nextPage() {
    if (page + 1 > pages) {
      return;
    }

    setSearchParams((params) => {
      params.set("page", String(page + 1));

      return params;
    });
  }

  function lastPage() {
    setSearchParams((params) => {
      params.set("page", String(pages));

      return params;
    });
  }

  return {
    firstPage,
    lastPage,
    nextPage,
    previousPage
  };
}
