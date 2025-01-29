import { useDispatch, useSelector } from "react-redux";
import { FetchTVShows, setOrdering, setPage } from "../../store/tvShowsSlice";
import MoviesPageHeader from "../../UI-Components/MoviesPageHeader/MoviesPageHeader";

import style from './PopularTvShows.module.scss';
import { useEffect } from "react";
import { AppDispatch } from "../../store";
import Pagination from "../../Components/Pagination/Pagination";
import { IMovie } from "../../types/types";

const PopularTVShows = () => {
  const { container, moviesSection, moviesWrap, movieItem } = style;
  const dispatch = useDispatch<AppDispatch>()
  const {
    movies,
    loading,
    error,
    currentPage,
    itemsPerPage,
    searchQuery,
    totalItems,
    ordering, } = useSelector((state: any) => state.TVShows);

  useEffect(() => {
    dispatch(FetchTVShows({
      limit: itemsPerPage,
      page: currentPage,
      searchQuery: searchQuery,
      ordering: ordering,
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
  console.log(currentPage, totalItems, itemsPerPage)
  return (
  <div className={container}>
    <MoviesPageHeader title='Top Popular TV-Shows' onChange={handlerOrdering} value={ordering} />
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
  </div>)
}
export default PopularTVShows