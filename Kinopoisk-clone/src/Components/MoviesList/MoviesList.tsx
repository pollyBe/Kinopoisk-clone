//TODO add rating to card

import MoviesPageHeader from '../../UI-Components/MoviesPageHeader/MoviesPageHeader';
import { IMovie } from '../../types/types';
import Pagination from '../Pagination/Pagination';
import style from './MoviesList.module.scss'
import { NavLink } from 'react-router-dom';

interface IProps{
  movies: IMovie[],
  title: string,
  currentPage: number,
  itemsPerPage: number,
  totalItems: number,
  setPage: ((page: number) => { payload: any; type: "movies/setPage"; }) | ((page: number) => { payload: any; type:"filtredMovies/setPage"}) | ((page: number) => { payload: any; type: "search/setPage"; })
}

const MoviesList = ({movies, title, currentPage, itemsPerPage, totalItems, setPage}:IProps) => {
  const { container, moviesSection, moviesWrap, movieItem } = style;
  return (
  <div className={container}>
    <MoviesPageHeader  title={title} />
    <div className={moviesSection}>
      <ul className={moviesWrap}  >
        {movies.map((movie:IMovie) => (
          <li key={movie.kinopoiskId?movie.kinopoiskId:movie.filmId} className={movieItem}>
            <NavLink to={`/movie/${movie.kinopoiskId? movie.kinopoiskId:movie.filmId}`}>
            <img
              src={movie.posterUrlPreview}
              alt="poster"
            /></NavLink>
            <p>{movie.nameRu?movie.nameRu:movie.nameOriginal}</p>
             </li>
        ))}
      </ul>
    </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        setPage={setPage} />
  </div>)
}
export default MoviesList