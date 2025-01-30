import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from './Main.module.scss';
import { FetchMovies, setOrdering, setPage } from "../../store/moviesSlice";
import { AppDispatch, RootState } from "../../store";
import MoviesList from "../../Components/MoviesList/MoviesList";

const Main = () => {
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
      <MoviesList
        movies={movies}
       value={ordering}
       title='Top 250 Popular Movies'
       onChange={handlerOrdering}
       currentPage={currentPage}
       itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        setPage={(page: number) => dispatch(setPage(page))}
        />
    </>
  );
};
export default Main;
