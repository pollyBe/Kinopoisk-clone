import { Link } from "react-router-dom"
import Header from "../../Components/Header/Header"
import style from './SelectedMoviePage.module.scss'
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";
import SelectedMovie from "../../Components/SelectedMovie/SelectedMovie";

const SelectedMoviePage = () => {
  const {selectedMovie}=useSelector((state)=>state.movies)
  const { container, backLink } = style;
  return (<div className={container}>
    <Header/>
    <Link to='/' className={backLink}>Back</Link>
    <SelectedMovie
      kinopoiskId={selectedMovie.kinopoiskId}
      posterUrl={selectedMovie.posterUrl}
      nameRu={selectedMovie.nameRu}
      nameEn={selectedMovie.nameEn}
      ratingImdb={selectedMovie.ratingImdb}
      ratingKinopoisk={selectedMovie.ratingKinopoisk} ratingAgeLimits={selectedMovie.ratingAgeLimits} countries={selectedMovie.countries}
      genres={selectedMovie.genres}
      year={selectedMovie.year}
      type={selectedMovie.type}
      description={selectedMovie.description}
    />
    <Footer />
  </div>)
}
export default SelectedMoviePage