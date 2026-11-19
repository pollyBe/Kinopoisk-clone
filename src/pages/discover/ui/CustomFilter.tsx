import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import style from "./CustomFilter.module.scss"
import { GetFilteredMovies, setFilteredMoviesPage } from "@/features/filter-movies"
import { MoviesList } from "@/widgets/movies-grid"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"

const CustomFilter = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { yearFrom, yearTo, genre, country, order, type } = location.state

  const { movies, loading, error, totalPages, currentPage } = useAppSelector(
    (state) => state.filteredMovies,
  )

  useEffect(() => {
    dispatch(
      GetFilteredMovies({
        country: country,
        page: currentPage,
        genre: genre,
        order: order,
        type: type,
        yearFrom: yearFrom,
        yearTo: yearTo,
      }),
    )
  }, [dispatch, currentPage, yearFrom, yearTo, genre, country, order, type])

  if (error) {
    return <div>Error...</div>
  }

  return (
    <>
      {movies.length !== 0 ? (
        <MoviesList
          movies={movies}
          title="Movies matching your filter criteria"
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={(page: number) => dispatch(setFilteredMoviesPage(page))}
          isLoading={loading}
        />
      ) : (
        <div className={style.errorWrap}>
          <p>Ooops.... Such category will be updated soon</p>
        </div>
      )}
    </>
  )
}

export default CustomFilter
