import type { IDiscoverArgs } from "@/entities/movie"

/** Фильтры без номера страницы: то, что хранится в URL страницы /discover */
export type IMovieFilters = Omit<IDiscoverArgs, "page">

const NUMBER_KEYS = ["genre", "country", "yearFrom", "yearTo"] as const
const STRING_KEYS = ["order", "type"] as const

const toNumber = (value: string | null) => {
  if (!value) return undefined
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

export const parseFilterParams = (params: URLSearchParams): IMovieFilters => {
  const filters: IMovieFilters = {}
  for (const key of NUMBER_KEYS) filters[key] = toNumber(params.get(key))
  for (const key of STRING_KEYS) filters[key] = params.get(key) || undefined
  return filters
}

/** Пустые значения в URL не попадают */
export const buildFilterParams = (filters: IMovieFilters): URLSearchParams => {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "") params.set(key, String(value))
  }
  return params
}
