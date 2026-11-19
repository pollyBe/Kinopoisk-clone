import { useEffect } from "react"
import { FetchSearchMovies, setSearchPage } from "@/features/search-movies"
import { MoviesList } from "@/widgets/movies-grid"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"

const SearchResults = () => {
  const dispatch = useAppDispatch()
  const { movies, loading, error, keyword, currentPage, totalPages } = useAppSelector(
    (state) => state.search,
  )

  useEffect(() => {
    if (keyword) {
      dispatch(FetchSearchMovies({ keyword, page: currentPage }))
    }
  }, [keyword, currentPage, dispatch])

  if (error) return "Error"
  return (
    <>
      <MoviesList
        movies={movies}
        title={`Search results for ' ${keyword}'`}
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={(page: number) => dispatch(setSearchPage(page))}
        isLoading={loading}
      />
    </>
  )
}
export default SearchResults
