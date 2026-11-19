import type { ReactNode } from "react"
import { MovieCard, MovieCardSkeleton, getMovieId, type IMovie } from "@/entities/movie"
import { Pagination } from "@/shared/ui/pagination"
import { EmptyState } from "@/shared/ui/status"
import MoviesPageHeader from "./MoviesPageHeader"
import style from "./MoviesList.module.scss"

const SKELETON_COUNT = 20

interface IProps {
  isLoading: boolean
  movies: IMovie[]
  title: string
  description?: string
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
  /** Текст, если после загрузки список пуст */
  emptyText?: string
  /** Показывается вместо сетки (ошибка, подсказка); null/undefined — сетка */
  status?: ReactNode
}

const MoviesList = ({
  isLoading,
  movies,
  title,
  description,
  currentPage,
  totalPages,
  setPage,
  emptyText = "Ничего не найдено",
  status,
}: IProps) => {
  const { container, moviesSection, moviesWrap } = style

  const renderContent = () => {
    if (status != null && status !== false) return status
    if (!isLoading && movies.length === 0) return <EmptyState message={emptyText} />

    return (
      <>
        <div className={moviesSection}>
          <ul className={moviesWrap} aria-busy={isLoading}>
            {isLoading
              ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
                  <li key={i}>
                    <MovieCardSkeleton />
                  </li>
                ))
              : movies.map((movie) => (
                  <li key={getMovieId(movie)}>
                    <MovieCard movie={movie} />
                  </li>
                ))}
          </ul>
        </div>
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setPage} />
        )}
      </>
    )
  }

  return (
    <section className={container}>
      <MoviesPageHeader title={title} description={description} />
      {renderContent()}
    </section>
  )
}
export default MoviesList
