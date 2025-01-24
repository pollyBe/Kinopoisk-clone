import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IMovieProps } from "../../types/types"

import style from './Main.module.scss'
import { FetchMovies } from "../../store/moviesSlice"
import Pagination from "../../Components/Pagination/Pagination"
import Slider from "../../Components/Slider/Slider"

const Main = () => {
  const dispatch = useDispatch()
  const {
    movies,
    loading,
    error,
    currentPage,
    itemsPerPage,
    searchQuery,
    ordering, } = useSelector((state: any) => state.movies)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(FetchMovies({
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      searchQuery: searchQuery,
      ordering: ordering,
    }))
  }, [currentPage, ordering])
  console.log(movies, currentPage, itemsPerPage, searchQuery)
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      <div className={style.container} >
        <Slider movies={movies} />
      {/* <ul className={style.moviesWrap} >
        {movies.map((movie) => (
          <li key={movie.kinopoiskId} className={style.movieItem}>
            <img src={movie.posterUrl} alt="poster" />
            <p>{movie.nameRu}</p>
          </li>
        ))}
        </ul> */}

        <Pagination />
        </div>
    </>
  )
}
export default Main