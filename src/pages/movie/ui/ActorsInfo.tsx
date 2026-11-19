import { Link } from "react-router-dom"
import type { IMovie } from "@/entities/movie"
import { useGetStaffByFilmQuery, type IStaff } from "@/entities/person"
import { ROUTES } from "@/shared/config"

import style from "./ActorsInfo.module.scss"

const ActorsInfo = ({ kinopoiskId }: Pick<IMovie, "kinopoiskId">) => {
  const { data: staff = [] } = useGetStaffByFilmQuery(kinopoiskId)

  return (
    <div className={style.ActorsInfo}>
      <h4>Actors:</h4>
      <ul className={style.actorsWrap}>
        {staff
          .slice(0, 9)
          .filter((actor: IStaff) => actor.professionKey === "ACTOR")
          .map((actor: IStaff) => (
            <li className={style.actorsItem} key={actor.staffId}>
              <Link to={ROUTES.actor(actor.staffId)}>
                {actor.nameEn ? actor.nameEn : actor.nameRu}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
export default ActorsInfo
