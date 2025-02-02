import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

import style from './Main.module.scss'
import MoviesList from "../../Components/MoviesList/MoviesList";
import { FetchMovies, setPage } from "../../store/moviesSlice";

const TopPopularAll = () => {
  const dispatch = useDispatch<AppDispatch>()
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
      type: 'TOP_POPULAR_ALL'
    }));
  }, [dispatch, currentPage]);

  if (loading) {
    return <div className={style.loading}>loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <>{movies.length !== 0 ?
      <MoviesList
        movies={movies}
        title='Top popular for all time'
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={(page: number) => dispatch(setPage(page))}
        />:<p>Such category will be updated soon</p>}
    </>)
}
export default TopPopularAll