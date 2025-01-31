import { Link, useParams } from "react-router-dom"
import Header from "../../Components/Header/Header"
import style from './SelectedMoviePage.module.scss'
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import SelectedMovie from "../../Components/SelectedMovie/SelectedMovie";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { GetMovieByID } from "../../store/movieSlice";

const SelectedMoviePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movie, loading, error } = useSelector((state:RootState) => state.movie);
  const { kinopoiskId } = useParams();
  const { container, backLink } = style;
  console.log(kinopoiskId)

  useEffect(() => {
    dispatch(GetMovieByID({kinopoiskId}));
  }, [kinopoiskId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (<div className={container}>
    <Header/>
    <Link to='/' className={backLink}>Back</Link>{movie &&
    <SelectedMovie
      kinopoiskId={movie.kinopoiskId}
      posterUrl={movie.posterUrl}
      nameRu={movie.nameRu}
      nameEn={movie.nameEn}
      ratingImdb={movie.ratingImdb}
      ratingKinopoisk={movie.ratingKinopoisk}
      ratingAgeLimits={movie.ratingAgeLimits}
      countries={movie.countries}
      genres={movie.genres}
      year={movie.year}
      type={movie.type}
      description={movie.description}
    />}
    <Footer />
  </div>)
}
export default SelectedMoviePage