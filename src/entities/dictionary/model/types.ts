export interface IGenre {
  id: number
  genre: string
}

export interface ICountry {
  id: number
  country: string
}

export interface IFiltersState {
  genres: IGenre[]
  countries: ICountry[]
  loading: boolean
  error: string | null
}
