import { NavLink } from "react-router-dom"
import { ROUTES } from "@/shared/config"
import { IMovie } from "../model/types"
import style from "./MovieCard.module.scss"

interface Props {
  movie: IMovie
}

const MovieCard = ({ movie }: Props) => {
  const id = movie.kinopoiskId || movie.filmId

  return (
    <NavLink to={ROUTES.movie(id ?? "")} className={style.card}>
      <div className={style.rating}>⭐ {movie.ratingKinopoisk || "—"}</div>
      <img src={movie.posterUrlPreview} alt="poster" />

      <div className={style.overlay}>
        <p>{movie.nameRu || movie.nameOriginal}</p>
      </div>
    </NavLink>
  )
}

export default MovieCard
