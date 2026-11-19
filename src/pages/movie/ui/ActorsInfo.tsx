import { useEffect } from "react"
import { Link } from "react-router"
import type { IMovie } from "@/entities/movie"
import { clearActors, GetActorsInfo, type IStaff } from "@/entities/person"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"

import style from "./ActorsInfo.module.scss"

const ActorsInfo = ({ kinopoiskId }: IMovie) => {
  const dispatch = useAppDispatch()
  const { actors } = useAppSelector((state) => state.actors)

  useEffect(() => {
    dispatch(GetActorsInfo(kinopoiskId))
    return () => {
      dispatch(clearActors())
    }
  }, [dispatch, kinopoiskId])

  return (
    <div className={style.ActorsInfo}>
      <h4>Actors:</h4>
      <ul className={style.actorsWrap}>
        {actors.slice(0, 9).map((actor: IStaff) => {
          if (actor.professionKey === "ACTOR") {
            return (
              <li className={style.actorsItem} key={actor.personId}>
                <Link to={`/actor/${actor.staffId}`}>
                  {actor.nameEn ? actor.nameEn : actor.nameRu}
                </Link>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}
export default ActorsInfo
