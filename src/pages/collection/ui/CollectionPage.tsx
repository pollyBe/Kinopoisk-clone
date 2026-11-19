import { Navigate, useParams } from "react-router-dom"
import { useGetCollectionQuery } from "@/entities/movie"
import { MoviesList } from "@/widgets/movies-grid"
import { DEFAULT_COLLECTION, findCollection, ROUTES } from "@/shared/config"
import { useDocumentTitle } from "@/shared/lib/dom"
import { usePageParam } from "@/shared/lib/url"
import { ErrorState } from "@/shared/ui/status"

/** Подборка фильмов: /collection/:slug?page=N; без slug (главная) — подборка по умолчанию */
const CollectionPage = () => {
  const { slug } = useParams()
  const collection = slug ? findCollection(slug) : DEFAULT_COLLECTION
  const [page, setPage] = usePageParam()
  useDocumentTitle(slug ? collection?.title : undefined)

  const { data, isFetching, isError, refetch } = useGetCollectionQuery(
    { type: collection?.type ?? "", page },
    { skip: !collection },
  )

  if (!collection) return <Navigate to={ROUTES.notFound} replace />

  return (
    <MoviesList
      isLoading={isFetching}
      movies={data?.items ?? []}
      title={collection.title}
      description={collection.description}
      currentPage={page}
      totalPages={data?.totalPages ?? 0}
      setPage={setPage}
      emptyText="В этой подборке пока пусто"
      status={isError ? <ErrorState onRetry={refetch} /> : null}
    />
  )
}
export default CollectionPage
