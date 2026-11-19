import { useSearchParams } from "react-router-dom"
import { useDiscoverMoviesQuery } from "@/entities/movie"
import { parseFilterParams } from "@/features/filter-movies"
import { MoviesList } from "@/widgets/movies-grid"
import { usePageParam } from "@/shared/lib/url"

/** Результаты фильтра: /discover?genre=&country=&order=&type=&yearFrom=&yearTo=&page= */
const DiscoverPage = () => {
  const [searchParams] = useSearchParams()
  const [page, setPage] = usePageParam()
  const filters = parseFilterParams(searchParams)

  const { data, isFetching, isError } = useDiscoverMoviesQuery({ ...filters, page })

  if (isError) {
    return <div>Error...</div>
  }

  return (
    <MoviesList
      movies={data?.items ?? []}
      title="Movies matching your filter criteria"
      currentPage={page}
      totalPages={data?.totalPages ?? 0}
      setPage={setPage}
      isLoading={isFetching}
      emptyText="Ooops.... Such category will be updated soon"
    />
  )
}

export default DiscoverPage
