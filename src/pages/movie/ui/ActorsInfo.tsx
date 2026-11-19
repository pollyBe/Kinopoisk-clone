import { Link } from "react-router-dom"
import type { IMovie } from "@/entities/movie"
import { getPersonName, useGetStaffByFilmQuery } from "@/entities/person"
import { ROUTES } from "@/shared/config"
import { Skeleton } from "@/shared/ui/skeleton"

import style from "./ActorsInfo.module.scss"

const MAX_ACTORS = 10

const ActorsInfo = ({ kinopoiskId }: Pick<IMovie, "kinopoiskId">) => {
  const { data: staff = [], isLoading, isError } = useGetStaffByFilmQuery(kinopoiskId)
  const actors = staff.filter((p) => p.professionKey === "ACTOR").slice(0, MAX_ACTORS)

  if (isError) return null
  if (!isLoading && actors.length === 0) return null

  return (
    <section className={style.cast} aria-labelledby="cast-title">
      <h2 id="cast-title">В ролях</h2>
      <ul>
        {isLoading
          ? Array.from({ length: 6 }, (_, i) => (
              <li key={i}>
                <Skeleton width={`${60 + ((i * 17) % 35)}%`} />
              </li>
            ))
          : actors.map((actor) => (
              <li key={actor.staffId}>
                <Link to={ROUTES.actor(actor.staffId)}>{getPersonName(actor)}</Link>
              </li>
            ))}
      </ul>
    </section>
  )
}
export default ActorsInfo
