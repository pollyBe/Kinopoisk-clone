import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { useState } from "react"
import type { Swiper as SwiperInstance } from "swiper"
import { Link } from "react-router-dom"
import { getMovieTitle, useGetCollectionQuery } from "@/entities/movie"
import { collectionPath, ROUTES } from "@/shared/config"
import { Poster } from "@/shared/ui/poster"
import { Skeleton } from "@/shared/ui/skeleton"
import { ErrorState } from "@/shared/ui/status"
import style from "./MoviesTopSlider.module.scss"

const SLIDER_TYPE = "TOP_POPULAR_ALL"

function MoviesTopSlider() {
  const { container, sliderTitle, slide, skeletonRow } = style

  // Тот же запрос, что у подборки «Популярное сейчас» (страница 1): кэш общий
  const { data, isLoading, isError, refetch } = useGetCollectionQuery({
    type: SLIDER_TYPE,
    page: 1,
  })
  const movies = data?.items ?? []

  /*
   * Swiper рендерит все слайды сразу, и браузер качал бы постеры даже за краем.
   * Постер получают только видимые слайды и следующая «страница»; остальные — по мере листания.
   */
  const [loadUntil, setLoadUntil] = useState(4)
  const updateLoadUntil = (swiper: SwiperInstance) => {
    const perView = Number(swiper.params.slidesPerView) || 2
    setLoadUntil((prev) => Math.max(prev, swiper.activeIndex + perView * 2))
  }

  const renderBody = () => {
    if (isLoading) {
      return (
        <div className={skeletonRow} aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} height="auto" radius="var(--radius-sm)" />
          ))}
        </div>
      )
    }
    if (isError) return <ErrorState compact onRetry={refetch} />

    return (
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={8}
        slidesPerView={2}
        slidesPerGroup={2}
        navigation
        pagination={{ clickable: true }}
        a11y={{
          prevSlideMessage: "Предыдущие фильмы",
          nextSlideMessage: "Следующие фильмы",
          paginationBulletMessage: "Перейти к слайду {{index}}",
        }}
        onInit={updateLoadUntil}
        onSlideChange={updateLoadUntil}
        onBreakpoint={updateLoadUntil}
        breakpoints={{
          480: { slidesPerView: 3, slidesPerGroup: 3 },
          768: { slidesPerView: 4, slidesPerGroup: 4 },
          1024: { slidesPerView: 6, slidesPerGroup: 6 },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.kinopoiskId}>
            <Link
              to={ROUTES.movie(movie.kinopoiskId)}
              className={slide}
              aria-label={getMovieTitle(movie)}
            >
              {index < loadUntil ? (
                <Poster
                  src={movie.posterUrlPreview || movie.posterUrl}
                  alt={getMovieTitle(movie)}
                  priority={index < 2}
                />
              ) : (
                <Skeleton height="100%" radius="0" />
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  }

  return (
    <section className={container} aria-labelledby="top-slider-title">
      <div className={sliderTitle}>
        <h2 id="top-slider-title">
          <Link to={collectionPath("top-popular")}>Популярное сейчас</Link>
        </h2>
      </div>
      {renderBody()}
    </section>
  )
}

export default MoviesTopSlider
