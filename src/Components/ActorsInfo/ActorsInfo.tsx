import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect } from "react"
import { GetActorsInfo, IActor } from "../../store/actorsSlice"
import { IMovie } from "../../types/types"

import style from './ActorsInfo.module.scss'
import { Link } from "react-router"
const ActorsInfo = ({ kinopoiskId }:IMovie) => {
  const dispatch = useDispatch<AppDispatch>()
  const { actors } = useSelector((state: RootState) => state.actors)
  useEffect(() => {
    dispatch(GetActorsInfo(kinopoiskId))
  }, [dispatch])
  console.log(actors)
  return (<div className={style.ActorsInfo}>
    <h4>Actors:</h4>
    <ul className={style.actorsWrap}>
      {actors.slice(0, 9).map((actor: IActor) => {
         if (actor.professionKey === 'ACTOR') {
           return (<li className={style.actorsItem}>
             <Link to={`/actor/${actor.staffId}`}>{actor.nameEn? actor.nameEn: actor.nameRu}</Link>
           </li>)
         }
      })}
    </ul>
  </div>)
}
export default ActorsInfo