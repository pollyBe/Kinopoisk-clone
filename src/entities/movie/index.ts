export type { IMovie, IMoviesState, ICollectionQuery } from "./model/types"
export { default as movieReducer, GetMovieByID } from "./model/movieSlice"
export {
  default as moviesReducer,
  FetchMovies,
  setPage as setMoviesPage,
} from "./model/moviesSlice"
export { default as MovieCard } from "./ui/MovieCard"
export { default as MovieCardSkeleton } from "./ui/MovieCardSkeleton"
