import Slider from "react-slick";
import style from './MoviesTopSlider.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchMovies, setSelectedMovie } from "../../store/moviesSlice";
import { useEffect } from "react";

function MoviesTopSlider() {
  const dispatch = useDispatch()
  const { sliderTitle, slide, } = style;
  const {
    movies,
    loading,
    error,
    currentPage,
    ordering, } = useSelector((state: any) => state.movies)
  useEffect(() => {
    dispatch(FetchMovies({
      type: `TOP_POPULAR_ALL`,
    }))
  }, [currentPage, ordering])
  if (loading) {
    return <div className={style.loading}>loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
        <div className={sliderTitle}>
          <h2>Top popular for all time</h2>
        </div>
      <Slider {...settings}>
        {movies.map((movie) => (
          // <li
          //   key={movie.kinopoiskId}
          //   className={slide}
          //   onClick={() => {
          //   dispatch(setSelectedMovie(movie))
          //   handleMovieClick(movie.kinopoiskId)}}>
          //   <img src={movie.posterUrl} alt="poster" />
          // </li>
          <Link to={`/movie/${movie.kinopoiskId}`} key={movie.kinopoiskId}
            className={slide}
            >
            <img src={movie.posterUrl} alt="poster" onClick={() => {
              dispatch(setSelectedMovie(movie))
            }} />
          </Link>
        ))}
      </Slider>
    </>
  );
}

export default MoviesTopSlider;
