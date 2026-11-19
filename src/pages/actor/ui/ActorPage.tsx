import { useNavigate, useParams } from "react-router-dom"
import ActorInfo from "./ActorInfo"
import style from "./ActorPage.module.scss"
import { useEffect } from "react"
import { GetActorInfo } from "@/entities/person"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { Button } from "@/shared/ui/button"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"

const ActorPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { actor, loading, error } = useAppSelector((state) => state.actor)
  const { staffId } = useParams()
  const { container } = style

  useEffect(() => {
    dispatch(GetActorInfo({ staffId }))
  }, [staffId])
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <div className={container}>
      <Header />
      <Button onClick={() => navigate(-1)} type="button" text="Back" />
      {actor && (
        <ActorInfo
          personId={actor.personId}
          nameRu={actor.nameRu}
          nameEn={actor.nameEn}
          sex={actor.sex}
          posterUrl={actor.posterUrl}
          growth={actor.growth}
          birthday={actor.birthday}
          death={actor.death}
          age={actor.age}
          birthplace={actor.birthplace}
          deathplace={actor.deathplace}
          spouses={actor.spouses}
          hasAwards={actor.hasAwards}
          profession={actor.profession}
          webUrl={actor.webUrl}
          facts={actor.facts}
          films={actor.films}
        />
      )}
      <Footer />
    </div>
  )
}
export default ActorPage
