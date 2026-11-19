export interface IMovie {
  countries?: { country: string }[]
  coverUrl?: string
  description?: string
  genres?: { genre: string }[]
  imdbId?: string
  ratingImdbVoteCount?: number
  kinopoiskId: number
  filmId?: number
  ratingKinopoiskVoteCount?: number
  logoUrl?: string
  nameEn?: string
  nameOriginal?: string
  nameRu?: string
  posterUrl?: string
  posterUrlPreview?: string
  ratingAgeLimits?: string
  ratingImdb?: number
  ratingKinopoisk?: number
  type?: string
  year?: number
  filmLength?: number
  webUrl?: string
}

export interface ICollectionQuery {
  limit?: number
  page?: number
  searchQuery?: string
  ordering?: string
  type?: string
  keyword?: string
}

export interface IMoviesState {
  movies: IMovie[]
  loading: boolean
  error: string | null
  totalItems: number
  totalPages: number
  currentPage: number
}
