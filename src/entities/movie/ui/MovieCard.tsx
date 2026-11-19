import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/config"
import { Poster } from "@/shared/ui/poster"
import { getMovieId, getMovieRating, getMovieTitle } from "../lib/movie"
import type { IMovie } from "../model/types"
import style from "./MovieCard.module.scss"

interface Props {
  movie: IMovie
  /** Слот для действий поверх постера (например, кнопка «В избранное») */
  actions?: ReactNode
}

const MovieCard = ({ movie, actions }: Props) => {
  const id = getMovieId(movie)
  const title = getMovieTitle(movie)
  const rating = getMovieRating(movie)

  // Кнопки не кладём внутрь ссылки: это невалидный HTML. Ссылка и действия — соседи в обёртке
  return (
    <div className={style.card}>
      <Link to={ROUTES.movie(id ?? "")} className={style.link}>
        {rating && (
          <span className={style.rating} aria-label={`Рейтинг ${rating}`}>
            ★ {rating.toFixed(1)}
          </span>
        )}
        <Poster src={movie.posterUrlPreview || movie.posterUrl} alt={`Постер: ${title}`} />
        <div className={style.overlay}>
          <p>{title}</p>
          {movie.year && <span>{movie.year}</span>}
        </div>
      </Link>
      {actions && <div className={style.actions}>{actions}</div>}
    </div>
  )
}

export default MovieCard
