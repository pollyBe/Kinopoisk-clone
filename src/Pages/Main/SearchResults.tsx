import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect } from "react"
import { FetchSearchMovies, setPage } from "../../store/searchSlice"
import MoviesList from "../../Components/MoviesList/MoviesList"

const SearchResults = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { movies, loading, error, keyword, currentPage, totalPages } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    if (keyword) {
      dispatch(FetchSearchMovies({ keyword, page: currentPage }));
    }
  }, [keyword, currentPage, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return 'Error'
  console.log(movies)
  return  (
    <>
      <MoviesList
        movies={movies}
        title={`Search results for ' ${keyword}'`}
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={(page: number) => dispatch(setPage(page))}
        />
    </>
  );
}
export default SearchResults