import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from './Main.module.scss';
import { FetchMovies } from "../../store/moviesSlice";
import Pagination from "../../Components/Pagination/Pagination";

import MoviesTopSlider from "../../Components/MoviesTopSlider/MoviesTopSlider";

const Main = () => {
  const dispatch = useDispatch();
  const {
    movies,
    loading,
    error,
    currentPage,
    itemsPerPage,
    searchQuery,
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

  console.log(movies);

  return (
    <>
      <div className={style.container}>
        {/* <MoviesTopSlider /> */}
        <ul className={style.moviesWrap}>
          {movies.map((movie) => (
            <li key={movie.kinopoiskId} className={style.movieItem}>
              <img src={movie.posterUrl} alt="poster" />
              <p>{movie.nameRu}</p>
            </li>
          ))}
        </ul>

        <Pagination />
      </div>
    </>
  );
};
export default Main;
