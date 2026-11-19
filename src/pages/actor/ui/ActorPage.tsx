import { Navigate, useParams } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query"
import { getPersonName, useGetPersonByIdQuery } from "@/entities/person"
import { isNotFoundError } from "@/shared/api"
import { ROUTES } from "@/shared/config"
import { useDocumentTitle } from "@/shared/lib/dom"
import { BackButton } from "@/shared/ui/back-button"
import { Skeleton } from "@/shared/ui/skeleton"
import { EmptyState, ErrorState } from "@/shared/ui/status"
import ActorInfo from "./ActorInfo"
import style from "./ActorPage.module.scss"

const ActorPageSkeleton = () => (
  <div className={style.skeleton} aria-busy="true" aria-label="Загрузка">
    <Skeleton height="auto" radius="var(--radius-md)" className={style.skeletonPhoto} />
    <div className={style.skeletonInfo}>
      <Skeleton height={44} width="60%" />
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} width={`${35 + ((i * 11) % 40)}%`} />
      ))}
    </div>
  </div>
)

const ActorPage = () => {
  const { staffId } = useParams()
  const id = Number(staffId)
  const isValidId = Number.isInteger(id) && id > 0
  const {
    data: actor,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPersonByIdQuery(isValidId ? id : skipToken)
  useDocumentTitle(actor ? getPersonName(actor) : undefined)

  if (!isValidId) return <Navigate to={ROUTES.notFound} replace />

  const renderContent = () => {
    if (isLoading) return <ActorPageSkeleton />
    if (isError && isNotFoundError(error)) return <EmptyState message="Такой человек не найден" />
    if (isError) return <ErrorState onRetry={refetch} />
    return actor ? <ActorInfo {...actor} /> : null
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
export default ActorPage
