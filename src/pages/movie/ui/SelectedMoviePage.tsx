// TODO create component with actors
//      add video
//      add photo galary

import { useNavigate, useParams } from "react-router-dom"
import SelectedMovie from "./SelectedMovie"
import style from "./SelectedMoviePage.module.scss"
import { useEffect } from "react"
import { GetMovieByID } from "@/entities/movie"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { Button } from "@/shared/ui/button"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"

const SelectedMoviePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { movie, loading, error } = useAppSelector((state) => state.movie)
  const { kinopoiskId } = useParams()
  const { container } = style

  useEffect(() => {
    dispatch(GetMovieByID({ kinopoiskId }))
  }, [kinopoiskId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <div className={container}>
      <Header />
      <Button onClick={() => navigate(-1)} type="button" text="Back" />
      {movie && (
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
        />
      )}
      <Footer />
    </div>
  )
}
export default SelectedMoviePage
