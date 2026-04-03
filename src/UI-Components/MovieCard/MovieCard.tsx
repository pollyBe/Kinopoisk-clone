import { NavLink } from "react-router-dom";
import { IMovie } from "../../types/types";
import style from "./MovieCard.module.scss";

interface Props {
  movie: IMovie;
}

const MovieCard = ({ movie }: Props) => {
  const id = movie.kinopoiskId || movie.filmId;

  return (
    <NavLink to={`/movie/${id}`} className={style.card}>
      <div className={style.rating}>
  ⭐    {movie.ratingKinopoisk || "—"}
      </div>
      <img src={movie.posterUrlPreview} alt="poster" />

      <div className={style.overlay}>
        <p>{movie.nameRu || movie.nameOriginal}</p>
      </div>
    </NavLink>
  );
};

export default MovieCard;