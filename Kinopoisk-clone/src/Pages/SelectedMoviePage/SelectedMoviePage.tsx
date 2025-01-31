import { useNavigate, useParams } from "react-router-dom"
import Header from "../../Components/Header/Header"
import style from './SelectedMoviePage.module.scss'
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import SelectedMovie from "../../Components/SelectedMovie/SelectedMovie";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { GetMovieByID } from "../../store/movieSlice";
import Button from "../../UI-Components/Button/Button";

const SelectedMoviePage = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const { movie, loading, error } = useSelector((state:RootState) => state.movie);
  const { kinopoiskId } = useParams();
  const { container } = style;

  useEffect(() => {
    dispatch(GetMovieByID({kinopoiskId}));
  }, [kinopoiskId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (<div className={container}>
    <Header/>
    <Button onClick={() =>navigate(-1)}
    type='button' text='Back'/>
    {movie &&
    <SelectedMovie
      kinopoiskId={movie.kinopoiskId}
      posterUrl={movie.posterUrl}
      nameRu={movie.nameRu}
      nameOriginal={movie.nameOriginal}
      ratingImdb={movie.ratingImdb}
      ratingImdbVoteCount={movie.ratingImdbVoteCount}
      ratingKinopoisk={movie.ratingKinopoisk}
      ratingKinopoiskVoteCount={movie.ratingKinopoiskVoteCount}
      ratingAgeLimits={movie.ratingAgeLimits}
      countries={movie.countries}
      genres={movie.genres}
      year={movie.year}
      type={movie.type}
      description={movie.description}
      filmLength={movie.filmLength}
      webUrl={movie.webUrl}
    />}
    <Footer />
  </div>)
}
export default SelectedMoviePage