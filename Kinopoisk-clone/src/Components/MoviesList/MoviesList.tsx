import { useDispatch } from 'react-redux';
import MoviesPageHeader from '../../UI-Components/MoviesPageHeader/MoviesPageHeader';
import { setSelectedMovie } from '../../store/moviesSlice';
import { IMovie } from '../../types/types';
import Pagination from '../Pagination/Pagination';
import style from './MoviesList.module.scss'
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';

interface IProps{
  movies: IMovie[],
  value: string,
  title: string,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  currentPage: number,
  itemsPerPage: number,
  totalItems: number,
  setPage: (page: number) => { payload: any; type: "movies/setPage"; }
}

const MoviesList = ({movies, value, title, onChange, currentPage, itemsPerPage, totalItems, setPage}:IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { container, moviesSection, moviesWrap, movieItem } = style;
  const navigate = useNavigate()
  return (
  <div className={container}>
    <MoviesPageHeader value={value} title={title} onChange={onChange} />
    <div className={moviesSection}>
      <ul className={moviesWrap}  >
        {movies.map((movie:IMovie) => (
            <li key={movie.kinopoiskId} className={movieItem}>
            <img
              src={movie.posterUrl}
              alt="poster"
              onClick={() => {
                dispatch(setSelectedMovie(movie))
                navigate(`/movie/${movie.kinopoiskId}`)
              }} />
            <p>{movie.nameRu}</p>
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