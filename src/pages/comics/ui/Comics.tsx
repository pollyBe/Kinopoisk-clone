import { useEffect } from "react"
import { FetchMovies, setMoviesPage } from "@/entities/movie"
import { MoviesList } from "@/widgets/movies-grid"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"

const Comics = () => {
  const dispatch = useAppDispatch()
  const { movies, loading, error, currentPage, totalPages } = useAppSelector(
    (state) => state.movies,
  )

  useEffect(() => {
    dispatch(
      FetchMovies({
        page: currentPage,
        type: `COMICS_THEME`,
      }),
    )
  }, [dispatch, currentPage])

  if (error) {
    return <div>Error...</div>
  }
  return (
    <>
      <MoviesList
        movies={movies}
        title="Comics"
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={(page: number) => dispatch(setMoviesPage(page))}
        isLoading={loading}
      />
    </>
  )
}
export default Comics
