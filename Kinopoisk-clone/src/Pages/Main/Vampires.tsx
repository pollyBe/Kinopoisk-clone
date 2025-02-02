import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

import style from './Main.module.scss'
import MoviesList from "../../Components/MoviesList/MoviesList";
import { FetchMovies, setPage } from "../../store/moviesSlice";

const Vampires = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    movies,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
  } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(FetchMovies({
      page: currentPage,
      type: 'VAMPIRE_THEME'
    }));
  }, [dispatch, currentPage, itemsPerPage]);
  console.log(movies)

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
        title='Hoa hoa hoa hoa(Vampires)'
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        setPage={(page: number) => dispatch(setPage(page))}
        />
    </>)
}
export default Vampires