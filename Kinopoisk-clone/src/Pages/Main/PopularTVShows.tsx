import { useDispatch, useSelector } from "react-redux";
import style from './Main.module.scss';
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { FetchMovies, setPage} from "../../store/moviesSlice";
import MoviesList from "../../Components/MoviesList/MoviesList";

const PopularTVShows = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    loading,
    error,
    currentPage,
    itemsPerPage,
    searchQuery,
    totalItems,
    ordering, } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(FetchMovies({
      limit: itemsPerPage,
      page: currentPage,
      searchQuery: searchQuery,
      ordering: ordering,
      type: `TOP_250_TV_SHOWS`,
    }));
  }, [dispatch, currentPage, ordering, itemsPerPage, searchQuery]);

  if (loading) {
    return <div className={style.loading}>loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }

  return (    <>
    <MoviesList
      movies={movies}
     title='Top 250 TV Shows'
     currentPage={currentPage}
     itemsPerPage={itemsPerPage}
      totalItems={totalItems}
      setPage={(page: number) => dispatch(setPage(page))}
      />
  </>)
}
export default PopularTVShows