import { useSearchParams } from "react-router-dom"
import { useDiscoverMoviesQuery } from "@/entities/movie"
import { parseFilterParams } from "@/features/filter-movies"
import { MoviesList } from "@/widgets/movies-grid"
import { useDocumentTitle } from "@/shared/lib/dom"
import { usePageParam } from "@/shared/lib/url"
import { ErrorState } from "@/shared/ui/status"

/** Результаты фильтра: /discover?genre=&country=&order=&type=&yearFrom=&yearTo=&page= */
const DiscoverPage = () => {
  const [searchParams] = useSearchParams()
  const [page, setPage] = usePageParam()
  const filters = parseFilterParams(searchParams)
  useDocumentTitle("Подбор по фильтрам")

  const { data, isFetching, isError, refetch } = useDiscoverMoviesQuery({ ...filters, page })

  const years =
    filters.yearFrom && filters.yearTo ? `Годы выпуска: ${filters.yearFrom}–${filters.yearTo}.` : ""

  return (
    <MoviesList
      movies={data?.items ?? []}
      title="Подбор по фильтрам"
      description={`${years} Изменить условия можно в панели слева.`.trim()}
      currentPage={page}
      totalPages={data?.totalPages ?? 0}
      setPage={setPage}
      isLoading={isFetching}
      emptyText="Ничего не нашлось. Попробуйте изменить фильтры."
      status={isError ? <ErrorState onRetry={refetch} /> : null}
    />
  )
}

export default DiscoverPage
