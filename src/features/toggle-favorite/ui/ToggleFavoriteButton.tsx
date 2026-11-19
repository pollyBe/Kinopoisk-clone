import { getMovieId, getMovieTitle, type IMovie } from "@/entities/movie"
import { selectIsFavorite, toggleFavorite } from "@/entities/favorite"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { toFavorite } from "../lib/toFavorite"
import style from "./ToggleFavoriteButton.module.scss"

interface IProps {
  movie: IMovie
  /** icon — круглая кнопка на карточке; full — кнопка с текстом на странице фильма */
  variant?: "icon" | "full"
}

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={style.heart}>
    <path d="M12 20.7 10.6 19.4C5.4 14.7 2 11.6 2 7.9 2 4.9 4.4 2.5 7.4 2.5c1.7 0 3.4.8 4.6 2.1 1.2-1.3 2.9-2.1 4.6-2.1 3 0 5.4 2.4 5.4 5.4 0 3.7-3.4 6.8-8.6 11.5L12 20.7Z" />
  </svg>
)

const ToggleFavoriteButton = ({ movie, variant = "icon" }: IProps) => {
  const dispatch = useAppDispatch()
  const id = getMovieId(movie) ?? 0
  const isFavorite = useAppSelector((state) => selectIsFavorite(state, id))
  const title = getMovieTitle(movie)
  const label = isFavorite ? `Убрать «${title}» из избранного` : `Добавить «${title}» в избранное`

  const onClick = () => {
    const favorite = toFavorite(movie)
    if (favorite) dispatch(toggleFavorite(favorite))
  }

  const classes = [style.button, style[variant], isFavorite ? style.active : ""].join(" ")

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-pressed={isFavorite}
      aria-label={label}
      title={variant === "icon" ? label : undefined}
    >
      <HeartIcon />
      {variant === "full" && <span>{isFavorite ? "В избранном" : "В избранное"}</span>}
    </button>
  )
}

export default ToggleFavoriteButton
