import { Navigate, useParams } from "react-router-dom"
import { useGetCollectionQuery } from "@/entities/movie"
import { MoviesList } from "@/widgets/movies-grid"
import { DEFAULT_COLLECTION, findCollection, ROUTES } from "@/shared/config"
import { usePageParam } from "@/shared/lib/url"

/** Подборка фильмов: /collection/:slug?page=N; без slug (главная) — подборка по умолчанию */
const CollectionPage = () => {
  const { slug } = useParams()
  const collection = slug ? findCollection(slug) : DEFAULT_COLLECTION
  const [page, setPage] = usePageParam()

  const { data, isFetching, isError } = useGetCollectionQuery(
    { type: collection?.type ?? "", page },
    { skip: !collection },
  )

  if (!collection) return <Navigate to={ROUTES.notFound} replace />

  if (isError) {
    return <div>Error...</div>
  }

  return (
    <MoviesList
      isLoading={isFetching}
      movies={data?.items ?? []}
      title={collection.title}
      currentPage={page}
      totalPages={data?.totalPages ?? 0}
      setPage={setPage}
      emptyText="Such category will be updated soon"
    />
  )
}
export default CollectionPage
