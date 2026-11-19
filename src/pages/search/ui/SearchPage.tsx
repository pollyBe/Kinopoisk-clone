import { useSearchParams } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query"
import { useSearchMoviesQuery } from "@/entities/movie"
import { MoviesList } from "@/widgets/movies-grid"
import { formatCount } from "@/shared/lib/format"
import { useDocumentTitle } from "@/shared/lib/dom"
import { usePageParam } from "@/shared/lib/url"
import { EmptyState, ErrorState } from "@/shared/ui/status"

/** Результаты поиска: /search?q=...&page=N */
const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get("q")?.trim() ?? ""
  const [page, setPage] = usePageParam()
  useDocumentTitle(keyword ? `Поиск: ${keyword}` : "Поиск")

  const { data, isFetching, isError, refetch } = useSearchMoviesQuery(
    keyword ? { keyword, page } : skipToken,
  )

  const found = data?.searchFilmsCountResult
  const description =
    found !== undefined
      ? `Найдено: ${formatCount(found, ["результат", "результата", "результатов"])}`
      : undefined

  return (
    <MoviesList
      movies={data?.films ?? []}
      title={keyword ? `Результаты поиска «${keyword}»` : "Поиск"}
      description={description}
      currentPage={page}
      totalPages={data?.pagesCount ?? 0}
      setPage={setPage}
      isLoading={isFetching}
      emptyText={`По запросу «${keyword}» ничего не найдено`}
      status={
        !keyword ? (
          <EmptyState message="Введите название фильма или сериала в строку поиска" />
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : null
      }
    />
  )
}
export default SearchPage
