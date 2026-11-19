import { Navigate, useParams } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query"
import { getMovieTitle, useGetMovieByIdQuery } from "@/entities/movie"
import { isNotFoundError } from "@/shared/api"
import { ROUTES } from "@/shared/config"
import { useDocumentTitle } from "@/shared/lib/dom"
import { BackButton } from "@/shared/ui/back-button"
import { Skeleton } from "@/shared/ui/skeleton"
import { EmptyState, ErrorState } from "@/shared/ui/status"
import SelectedMovie from "./SelectedMovie"
import style from "./MoviePage.module.scss"

const MoviePageSkeleton = () => (
  <div className={style.skeleton} aria-busy="true" aria-label="Загрузка">
    <Skeleton height="auto" radius="var(--radius-md)" className={style.skeletonPoster} />
    <div className={style.skeletonInfo}>
      <Skeleton height={44} width="70%" />
      <Skeleton height={56} width="45%" />
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} width={`${40 + ((i * 13) % 40)}%`} />
      ))}
      <Skeleton height={120} />
    </div>
  </div>
)

const MoviePage = () => {
  const { kinopoiskId } = useParams()
  const id = Number(kinopoiskId)
  const isValidId = Number.isInteger(id) && id > 0
  const {
    data: movie,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMovieByIdQuery(isValidId ? id : skipToken)
  useDocumentTitle(movie ? getMovieTitle(movie) : undefined)

  if (!isValidId) return <Navigate to={ROUTES.notFound} replace />

  const renderContent = () => {
    if (isLoading) return <MoviePageSkeleton />
    if (isError && isNotFoundError(error)) return <EmptyState message="Такой фильм не найден" />
    if (isError) return <ErrorState onRetry={refetch} />
    return movie ? <SelectedMovie {...movie} /> : null
  }

  return (
    <div className={style.container}>
      <div className={style.back}>
        <BackButton />
      </div>
      {renderContent()}
    </div>
  )
}
export default MoviePage
