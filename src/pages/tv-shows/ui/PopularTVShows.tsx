import { useEffect } from "react"
import { FetchMovies, setMoviesPage } from "@/entities/movie"
import { MoviesList } from "@/widgets/movies-grid"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"

const PopularTVShows = () => {
  const dispatch = useAppDispatch()
  const { movies, loading, error, currentPage, totalPages } = useAppSelector(
    (state) => state.movies,
  )

  useEffect(() => {
    dispatch(
      FetchMovies({
        page: currentPage,
        type: `TOP_250_TV_SHOWS`,
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
        title="Top 250 TV Shows"
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={(page: number) => dispatch(setMoviesPage(page))}
        isLoading={loading}
      />
    </>
  )
}
export default PopularTVShows
