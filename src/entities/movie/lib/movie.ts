import type { IMovie } from "../model/types"

const TYPE_LABELS: Record<string, string> = {
  FILM: "Фильм",
  TV_SERIES: "Сериал",
  MINI_SERIES: "Мини-сериал",
  TV_SHOW: "ТВ-шоу",
  VIDEO: "Видео",
}

/** FILM → «Фильм»; неизвестный тип возвращается как есть */
export const getMovieTypeLabel = (type?: string) => (type ? (TYPE_LABELS[type] ?? type) : "")

/** Название для показа: русское, затем оригинальное */
export const getMovieTitle = (movie: Pick<IMovie, "nameRu" | "nameOriginal" | "nameEn">) =>
  movie.nameRu || movie.nameOriginal || movie.nameEn || "Без названия"

/** id фильма: в подборках это kinopoiskId, в поиске и фильмографии — filmId */
export const getMovieId = (movie: Pick<IMovie, "kinopoiskId" | "filmId">) =>
  movie.kinopoiskId || movie.filmId

/** Рейтинг Кинопоиска; у поиска он строкой, а «99%» — это ожидание, не рейтинг */
export const getMovieRating = (movie: Pick<IMovie, "ratingKinopoisk" | "rating">) => {
  if (movie.ratingKinopoisk) return movie.ratingKinopoisk
  if (movie.rating && !movie.rating.includes("%")) {
    const value = Number(movie.rating)
    if (Number.isFinite(value) && value > 0) return value
  }
  return undefined
}
