import type { IMovie } from "@/entities/movie/@x/favorite"

/**
 * Фильм в избранном: только то, что нужно карточке.
 * Структурно совместим с IMovie, поэтому подходит для MovieCard.
 */
export type IFavoriteMovie = Pick<
  IMovie,
  | "kinopoiskId"
  | "nameRu"
  | "nameOriginal"
  | "nameEn"
  | "posterUrlPreview"
  | "ratingKinopoisk"
  | "year"
> & {
  /** Когда добавлен (ms), для сортировки «сначала новые» */
  addedAt: number
}

export interface IFavoritesState {
  items: IFavoriteMovie[]
}
