import { useEffect } from 'react';
import { GetFiltredMovies, setPage } from '../../store/filtredMoviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useLocation } from 'react-router-dom';
import MoviesList from '../../Components/MoviesList/MoviesList';

import style from './Main.module.scss'

const CustomFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { yearFrom, yearTo, genre, country, order, type } = location.state;

  const {
    movies,
    loading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
  } = useSelector((state: RootState) => state.filtredMovies);

  useEffect(() => {
    dispatch(
      GetFiltredMovies({
        country: country,
        page: currentPage,
        genre: genre,
        order: order,
        type: type,
        yearFrom: yearFrom,
        yearTo: yearTo,
      })
    );
  }, [dispatch, currentPage, itemsPerPage, yearFrom, yearTo, genre, country, order, type]);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      {movies.length !== 0 ? (
        <MoviesList
          movies={movies}
          title="Top popular for all time"
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          setPage={(page: number) => dispatch(setPage(page))}
        />
      ) : (
          <div className={style.errorWrap}>
        <p>Ooops.... Such category will be updated soon</p></div>
      )}
    </>
  );
};

export default CustomFilter;
