export type { IFilteredMoviesState, IFilteredObject } from "./model/types"
export {
  default as filteredMoviesReducer,
  GetFilteredMovies,
  setPage as setFilteredMoviesPage,
} from "./model/filteredMoviesSlice"
export { default as FormOfFilters } from "./ui/FormOfFilters"
