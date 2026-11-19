import type { IMovie } from "@/entities/movie"

export interface IFilteredMoviesState {
  movies: IMovie[]
  loading: boolean
  error: null | string
  totalItems: number
  totalPages: number
  currentPage: number
  itemsPerPage: number
  order: string
  countryId: string
  genreId: string
  yearTo: number
  yearFrom: number
  type: string
}

export interface IFilteredObject {
  country: string
  page: number
  genre: string
  order: string
  type: string
  yearFrom: number
  yearTo: number
}
