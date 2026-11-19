import { getMovieId, getMovieRating, type IMovie } from "@/entities/movie"
import type { IFavoriteMovie } from "@/entities/favorite"

/**
 * Урезанная копия фильма для избранного. Фильмы из поиска приходят с filmId вместо kinopoiskId
 * и рейтингом строкой — здесь всё приводится к одному виду.
 */
export const toFavorite = (movie: IMovie): Omit<IFavoriteMovie, "addedAt"> | null => {
  const id = getMovieId(movie)
  if (!id) return null
  return {
    kinopoiskId: id,
    nameRu: movie.nameRu,
    nameOriginal: movie.nameOriginal,
    nameEn: movie.nameEn,
    posterUrlPreview: movie.posterUrlPreview || movie.posterUrl,
    ratingKinopoisk: getMovieRating(movie),
    year: movie.year,
  }
}
