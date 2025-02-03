import Slider from "react-slick";
import style from './MoviesTopSlider.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSliderMovies } from "../../store/sliderMoviesSlice";
import { IMovie } from "../../types/types";
import { AppDispatch, RootState } from "../../store";

function MoviesTopSlider() {
  const dispatch = useDispatch<AppDispatch>()
  const { sliderTitle, slide, container} = style;
  const {
    sliderContent,
    loading,
    error,
  } = useSelector((state: RootState) => state.slider)
  useEffect(() => {
    dispatch(fetchSliderMovies())
  }, [dispatch])
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
    <div className={container}>
        <div className={sliderTitle}>
          <h2>Top popular for all time</h2>
        </div>
      <Slider {...settings}>
        {sliderContent.map((movie:IMovie) => (
          <Link to={`/movie/${movie.kinopoiskId}`} key={movie.kinopoiskId}
            className={slide}
            >
            <img src={movie.posterUrl} alt="poster" />
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default MoviesTopSlider;
