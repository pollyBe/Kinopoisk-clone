export interface IGenre {
  id: number
  genre: string
}

export interface ICountry {
  id: number
  country: string
}

/** Ответ /v2.2/films/filters */
export interface IFilters {
  genres: IGenre[]
  countries: ICountry[]
}
