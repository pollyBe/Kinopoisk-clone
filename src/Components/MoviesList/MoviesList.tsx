//TODO add rating to card

import MovieCard from '../../UI-Components/MovieCard/MovieCard';
import MovieCardSkeleton from '../../UI-Components/MovieCardSkeleton/MovieCardSkeleton';
import MoviesPageHeader from '../../UI-Components/MoviesPageHeader/MoviesPageHeader';
import { IMovie } from '../../types/types';
import Pagination from '../Pagination/Pagination';
import style from './MoviesList.module.scss'

interface IProps{
  isLoading: boolean,
  movies: IMovie[],
  title: string,
  currentPage: number,
  totalPages: number,
  setPage: ((page: number) => { payload: any; type: "movies/setPage"; }) | ((page: number) => { payload: any; type:"filtredMovies/setPage"}) | ((page: number) => { payload: any; type: "search/setPage"; })
}

const MoviesList = ({ isLoading, movies, title, currentPage,  totalPages, setPage}:IProps) => {
  const { container, moviesSection, moviesWrap, movieItem } = style;
  return (
  <div className={container}>
    <MoviesPageHeader  title={title} />
    <div className={moviesSection}>
    <ul className={moviesWrap}>
  {isLoading
    ? Array.from({ length: 15 }).map((_, i) => (
        <li key={i} className={movieItem}>
          <MovieCardSkeleton />
        </li>
      ))
    : movies.map((movie: IMovie) => (
        <li
          key={movie.kinopoiskId || movie.filmId}
          className={movieItem}
        >
          <MovieCard movie={movie} />
        </li>
      ))}
</ul>
    </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage} />
  </div>)
}
export default MoviesList