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
  /** Только в результатах поиска: строка вида "8.5" или "99%" (ожидание) */
  rating?: string
}

/** Ответ /v2.2/films/collections и /v2.2/films */
export interface IMoviesPage {
  items: IMovie[]
  total: number
  totalPages: number
}

/** Ответ /v2.1/films/search-by-keyword */
export interface ISearchResult {
  keyword: string
  pagesCount: number
  searchFilmsCountResult: number
  films: IMovie[]
}

export interface ICollectionArgs {
  type: string
  page: number
}

export interface ISearchArgs {
  keyword: string
  page: number
}

/** Параметры /v2.2/films; незаданные поля не отправляются */
export interface IDiscoverArgs {
  genre?: number
  country?: number
  order?: string
  type?: string
  yearFrom?: number
  yearTo?: number
  page: number
}
