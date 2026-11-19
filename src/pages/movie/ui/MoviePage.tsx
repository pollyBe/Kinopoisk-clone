// TODO add video
//      add photo galary

import { Navigate, useNavigate, useParams } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query"
import { useGetMovieByIdQuery } from "@/entities/movie"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { ROUTES } from "@/shared/config"
import { Button } from "@/shared/ui/button"
import SelectedMovie from "./SelectedMovie"
import style from "./MoviePage.module.scss"

const MoviePage = () => {
  const navigate = useNavigate()
  const { kinopoiskId } = useParams()
  const id = Number(kinopoiskId)
  const isValidId = Number.isInteger(id) && id > 0
  const { data: movie, isLoading, isError } = useGetMovieByIdQuery(isValidId ? id : skipToken)
  const { container } = style

  if (!isValidId) return <Navigate to={ROUTES.notFound} replace />
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  return (
    <div className={container}>
      <Header />
      <Button onClick={() => navigate(-1)} type="button" text="Back" />
      {movie && <SelectedMovie {...movie} />}
      <Footer />
    </div>
  )
}
export default MoviePage
