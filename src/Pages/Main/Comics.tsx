import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from './Main.module.scss';
import { FetchMovies, setPage } from "../../store/moviesSlice";
import { AppDispatch, RootState } from "../../store";
import MoviesList from "../../Components/MoviesList/MoviesList";

const Comics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
 } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(FetchMovies({
      page: currentPage,
      type: `COMICS_THEME`,
    }));
  }, [dispatch, currentPage]);

  if (loading) {
    return <div className={style.loading}>loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <>
      <MoviesList
        movies={movies}
       title='Comics'
       currentPage={currentPage}
       totalPages={totalPages}
        setPage={(page: number) => dispatch(setPage(page))}
        />
    </>
  );
};
export default Comics;
