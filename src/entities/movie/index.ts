export type {
  IMovie,
  IMoviesPage,
  ISearchResult,
  ICollectionArgs,
  ISearchArgs,
  IDiscoverArgs,
} from "./model/types"
export {
  useGetCollectionQuery,
  useGetMovieByIdQuery,
  useSearchMoviesQuery,
  useDiscoverMoviesQuery,
} from "./api/movieApi"
export { getMovieTypeLabel, getMovieTitle, getMovieId, getMovieRating } from "./lib/movie"
export { default as MovieCard } from "./ui/MovieCard"
export { default as MovieCardSkeleton } from "./ui/MovieCardSkeleton"
