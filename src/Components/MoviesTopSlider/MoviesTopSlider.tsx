import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import style from './MoviesTopSlider.module.scss';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSliderMovies } from "../../store/sliderMoviesSlice";
import { IMovie } from "../../types/types";
import { AppDispatch, RootState } from "../../store";

function MoviesTopSlider() {
  const dispatch = useDispatch<AppDispatch>();
  const { sliderTitle, slide, container } = style;

  const { sliderContent, loading, error } =
    useSelector((state: RootState) => state.slider);

  useEffect(() => {
    dispatch(fetchSliderMovies());
  }, [dispatch]);

  if (loading) {
    return <div className={style.loading}>loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className={container}>
      <div className={sliderTitle}>
        <h2>Top popular for all time</h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={2}
        slidesPerView={6}
        slidesPerGroup={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          1024: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          600: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            initialSlide: 2,
          },
          480: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        }}
      >
        {sliderContent.map((movie: IMovie) => (
          <SwiperSlide key={movie.kinopoiskId}>
            <Link
              to={`/movie/${movie.kinopoiskId}`}
              className={slide}
            >
              <img src={movie.posterUrl} alt="poster" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MoviesTopSlider;