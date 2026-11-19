import { Navigate, useNavigate, useParams } from "react-router-dom"
import { skipToken } from "@reduxjs/toolkit/query"
import { useGetPersonByIdQuery } from "@/entities/person"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { ROUTES } from "@/shared/config"
import { Button } from "@/shared/ui/button"
import ActorInfo from "./ActorInfo"
import style from "./ActorPage.module.scss"

const ActorPage = () => {
  const navigate = useNavigate()
  const { staffId } = useParams()
  const id = Number(staffId)
  const isValidId = Number.isInteger(id) && id > 0
  const { data: actor, isLoading, isError } = useGetPersonByIdQuery(isValidId ? id : skipToken)
  const { container } = style

  if (!isValidId) return <Navigate to={ROUTES.notFound} replace />
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  return (
    <div className={container}>
      <Header />
      <Button onClick={() => navigate(-1)} type="button" text="Back" />
      {actor && <ActorInfo {...actor} />}
      <Footer />
    </div>
  )
}
export default ActorPage
