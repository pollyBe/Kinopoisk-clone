import { Link } from "react-router-dom"
import { selectFavorites } from "@/entities/favorite"
import { MoviesList } from "@/widgets/movies-grid"
import { ROUTES } from "@/shared/config"
import { useDocumentTitle } from "@/shared/lib/dom"
import { formatCount } from "@/shared/lib/format"
import { useAppSelector } from "@/shared/lib/store"
import { EmptyState } from "@/shared/ui/status"
import style from "./FavoritesPage.module.scss"

const FavoritesPage = () => {
  const favorites = useAppSelector(selectFavorites)
  useDocumentTitle("Избранное")

  return (
    <MoviesList
      title="Избранное"
      description={
        favorites.length
          ? `${formatCount(favorites.length, ["фильм", "фильма", "фильмов"])}. Список хранится в этом браузере.`
          : undefined
      }
      movies={favorites}
      isLoading={false}
      currentPage={1}
      totalPages={1}
      setPage={() => {}}
      status={
        favorites.length === 0 ? (
          <EmptyState message="Вы пока ничего не добавили. Нажмите ♡ на постере, чтобы сохранить фильм.">
            <Link to={ROUTES.home} className={style.link}>
              Перейти к подборкам
            </Link>
          </EmptyState>
        ) : null
      }
    />
  )
}

export default FavoritesPage
