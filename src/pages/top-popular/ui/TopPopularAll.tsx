import { useEffect } from "react"
import { FetchMovies, setMoviesPage } from "@/entities/movie"
import { MoviesList } from "@/widgets/movies-grid"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"

const TopPopularAll = () => {
  const dispatch = useAppDispatch()
  const { movies, loading, error, currentPage, totalPages } = useAppSelector(
    (state) => state.movies,
  )

  useEffect(() => {
    dispatch(
      FetchMovies({
        page: currentPage,
        type: "TOP_POPULAR_ALL",
      }),
    )
  }, [dispatch, currentPage])

  if (error) {
    return <div>Error...</div>
  }
  return (
    <>
      {movies.length !== 0 ? (
        <MoviesList
          movies={movies}
          title="Top popular for all time"
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={(page: number) => dispatch(setMoviesPage(page))}
          isLoading={loading}
        />
      ) : (
        <p>Such category will be updated soon</p>
      )}
    </>
  )
}
export default TopPopularAll
