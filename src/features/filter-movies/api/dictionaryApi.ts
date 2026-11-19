import { baseApi } from "@/shared/api"
import type { IFilters } from "../model/types"

const dictionaryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFilters: build.query<IFilters, void>({
      query: () => "/v2.2/films/filters",
      // справочник почти не меняется
      keepUnusedDataFor: 60 * 60,
    }),
  }),
})

export const { useGetFiltersQuery } = dictionaryApi
