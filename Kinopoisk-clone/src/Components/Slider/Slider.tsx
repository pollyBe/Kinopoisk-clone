import Slider from "react-slick";
import './Slider.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from './Slider.module.scss'
import { IMovieProps } from "../../types/types";

function Responsive( movies : IMovieProps[]) {
  console.log(movies)
  let settings = {
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

  return (<>
  <div className={style.sliderWrap}>
  <div className={style.sliderTitle}>
        <h2>Top popular for all time</h2>
      </div>
      </div>
    <Slider {...settings}>
      {movies.map((movie) => (
        <div key={movie.kinopoiskId} className={style.slide}>
          <img src={movie.posterUrl} alt="poster" />
        </div>
      ))}
      </Slider>
   </>
  );
}

export default Responsive;
