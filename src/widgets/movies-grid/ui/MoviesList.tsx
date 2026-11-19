import { MovieCard, MovieCardSkeleton, type IMovie } from "@/entities/movie"
import { Pagination } from "@/shared/ui/pagination"
import MoviesPageHeader from "./MoviesPageHeader"
import style from "./MoviesList.module.scss"

interface IProps {
  isLoading: boolean
  movies: IMovie[]
  title: string
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
}

const MoviesList = ({ isLoading, movies, title, currentPage, totalPages, setPage }: IProps) => {
  const { container, moviesSection, moviesWrap, movieItem } = style
  return (
    <div className={container}>
      <MoviesPageHeader title={title} />
      <div className={moviesSection}>
        <ul className={moviesWrap}>
          {isLoading
            ? Array.from({ length: 15 }).map((_, i) => (
                <li key={i} className={movieItem}>
                  <MovieCardSkeleton />
                </li>
              ))
            : movies.map((movie: IMovie) => (
                <li key={movie.kinopoiskId || movie.filmId} className={movieItem}>
                  <MovieCard movie={movie} />
                </li>
              ))}
        </ul>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setPage} />
    </div>
  )
}
export default MoviesList
