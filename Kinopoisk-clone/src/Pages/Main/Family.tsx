import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

import style from './Main.module.scss'
import MoviesList from "../../Components/MoviesList/MoviesList";
import { FetchMovies, setOrdering, setPage } from "../../store/moviesSlice";

const TopPopularAll = () => {
  const dispatch = useDispatch<AppDispatch>()
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
      type: 'TOP_POPULAR_ALL'
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
  console.log(movies)

  return (
    <>{movies.length !== 0 ?
      <MoviesList
        movies={movies}
        value={ordering}
        title='Top popular for all time'
        onChange={handlerOrdering}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        setPage={(page: number) => dispatch(setPage(page))}
        />:<p>Such category will be updated soon</p>}
    </>)
}
export default TopPopularAll