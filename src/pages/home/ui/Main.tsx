import { useEffect } from "react"
import { FetchMovies, setMoviesPage } from "@/entities/movie"
import { MoviesList } from "@/widgets/movies-grid"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"

const Main = () => {
  const dispatch = useAppDispatch()
  const { movies, loading, error, currentPage, totalPages } = useAppSelector(
    (state) => state.movies,
  )

  useEffect(() => {
    dispatch(
      FetchMovies({
        page: currentPage,
        type: `TOP_250_MOVIES`,
      }),
    )
  }, [dispatch, currentPage])

  if (error) {
    return <div>Error...</div>
  }

  return (
    <>
      <MoviesList
        isLoading={loading}
        movies={movies}
        title="Top 250 Popular Movies"
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={(page: number) => dispatch(setMoviesPage(page))}
      />
    </>
  )
}
export default Main
