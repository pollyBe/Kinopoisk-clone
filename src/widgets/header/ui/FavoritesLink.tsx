import { NavLink } from "react-router-dom"
import { selectFavoritesCount } from "@/entities/favorite"
import { ROUTES } from "@/shared/config"
import { useAppSelector } from "@/shared/lib/store"
import style from "./FavoritesLink.module.scss"

/** Сердечко со счётчиком в шапке */
const FavoritesLink = () => {
  const count = useAppSelector(selectFavoritesCount)
  const label = count ? `Избранное: ${count}` : "Избранное"

  return (
    <NavLink
      to={ROUTES.favorites}
      className={({ isActive }) => (isActive ? `${style.link} ${style.active}` : style.link)}
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.7 10.6 19.4C5.4 14.7 2 11.6 2 7.9 2 4.9 4.4 2.5 7.4 2.5c1.7 0 3.4.8 4.6 2.1 1.2-1.3 2.9-2.1 4.6-2.1 3 0 5.4 2.4 5.4 5.4 0 3.7-3.4 6.8-8.6 11.5L12 20.7Z" />
      </svg>
      {count > 0 && (
        <span className={style.badge} aria-hidden="true">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </NavLink>
  )
}

export default FavoritesLink
