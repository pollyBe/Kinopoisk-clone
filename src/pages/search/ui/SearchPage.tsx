import { useSearchParams } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query"
import { useSearchMoviesQuery } from "@/entities/movie"
import { MoviesList } from "@/widgets/movies-grid"
import { usePageParam } from "@/shared/lib/url"

/** Результаты поиска: /search?q=...&page=N */
const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get("q")?.trim() ?? ""
  const [page, setPage] = usePageParam()

  const { data, isFetching, isError } = useSearchMoviesQuery(
    keyword ? { keyword, page } : skipToken,
  )

  if (isError) return "Error"
  return (
    <MoviesList
      movies={data?.films ?? []}
      title={`Search results for ' ${keyword}'`}
      currentPage={page}
      totalPages={data?.pagesCount ?? 0}
      setPage={setPage}
      isLoading={isFetching}
    />
  )
}
export default SearchPage
