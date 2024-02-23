import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { tagsServices } from "../../services/tagsServices";

export function useHome() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlFilter = searchParams.get("filter") ?? "";
  const [filter, setFilter] = useState(urlFilter);

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    data: tagsResponse,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ["get-tags", urlFilter, page],
    queryFn: async () => {
      return await tagsServices.get({
        page,
        title: urlFilter
      });
    },
    placeholderData: keepPreviousData
  });

  function handleFilter() {
    setSearchParams((params) => {
      params.set("page", "1");
      params.set("filter", filter);

      return params;
    });
  }

  return {
    filter,
    setFilter,
    handleFilter,
    isFetching,
    page,
    isLoading,
    tagsResponse
  };
}
