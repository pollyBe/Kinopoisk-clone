import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/config"
import { Poster } from "@/shared/ui/poster"
import { getMovieId, getMovieRating, getMovieTitle } from "../lib/movie"
import type { IMovie } from "../model/types"
import style from "./MovieCard.module.scss"

interface Props {
  movie: IMovie
}

const MovieCard = ({ movie }: Props) => {
  const id = getMovieId(movie)
  const title = getMovieTitle(movie)
  const rating = getMovieRating(movie)

  return (
    <Link to={ROUTES.movie(id ?? "")} className={style.card}>
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
  )
}

export default MovieCard
