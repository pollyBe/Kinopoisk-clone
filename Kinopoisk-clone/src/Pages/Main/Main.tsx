import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from './Main.module.scss';
import { FetchMovies, setOrdering, setPage } from "../../store/moviesSlice";
import Pagination from "../../Components/Pagination/Pagination";
import { AppDispatch } from "../../store";
import { IMovie } from "../../types/types";
import MoviesPageHeader from "../../UI-Components/MoviesPageHeader/MoviesPageHeader";

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { container, moviesSection, moviesWrap, movieItem } = style;
  const {
    movies,
    loading,
    error,
    currentPage,
    itemsPerPage,
    searchQuery,
    totalItems,
    ordering, } = useSelector((state: any) => state.movies);

  useEffect(() => {
    dispatch(FetchMovies({
      limit: itemsPerPage,
      page: currentPage,
      searchQuery: searchQuery,
      ordering: ordering,
      type: `TOP_250_MOVIES`,
    }));
  }, [dispatch, currentPage, ordering, itemsPerPage, searchQuery]);

  if (loading) {
    return <div className={style.loading}>loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  const handlerOrdering = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setOrdering(e.target.value));
  };
  return (
    <>
      <div className={container}>
        <MoviesPageHeader value={ordering} title='Top 250 Popular Movies' onChange={handlerOrdering} />
        <div className={moviesSection}>
          <ul className={moviesWrap}>
            {movies.map((movie:IMovie) => (
              <li key={movie.kinopoiskId} className={movieItem}>
                <img src={movie.posterUrl} alt="poster" />
                <p>{movie.nameRu}</p>
              </li>
            ))}
          </ul>
        </div>
        <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} setPage={(page: number) => dispatch(setPage(page))}/>
      </div>
    </>
  );
};
export default Main;
