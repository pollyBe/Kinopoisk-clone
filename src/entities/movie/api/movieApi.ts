import { baseApi } from "@/shared/api"
import type {
  ICollectionArgs,
  IDiscoverArgs,
  IMovie,
  IMoviesPage,
  ISearchArgs,
  ISearchResult,
} from "../model/types"

const movieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCollection: build.query<IMoviesPage, ICollectionArgs>({
      query: ({ type, page }) => ({ url: "/v2.2/films/collections", params: { type, page } }),
    }),
    getMovieById: build.query<IMovie, number>({
      query: (id) => `/v2.2/films/${id}`,
    }),
    searchMovies: build.query<ISearchResult, ISearchArgs>({
      query: ({ keyword, page }) => ({
        url: "/v2.1/films/search-by-keyword",
        params: { keyword, page },
      }),
    }),
    discoverMovies: build.query<IMoviesPage, IDiscoverArgs>({
      query: ({ genre, country, ...rest }) => ({
        url: "/v2.2/films",
        // fetchBaseQuery пропускает undefined-параметры
        params: { genres: genre, countries: country, ...rest },
      }),
    }),
  }),
})

export const {
  useGetCollectionQuery,
  useGetMovieByIdQuery,
  useSearchMoviesQuery,
  useDiscoverMoviesQuery,
} = movieApi
