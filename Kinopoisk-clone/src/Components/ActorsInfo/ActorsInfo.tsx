import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect } from "react"
import { GetActorsInfo, IActor } from "../../store/actorsSlice"
import { IMovie } from "../../types/types"

import style from './ActorsInfo.module.scss'
const ActorsInfo = ({ kinopoiskId }:IMovie) => {
  const dispatch = useDispatch<AppDispatch>()
  const { actors } = useSelector((state: RootState) => state.actors)
  useEffect(() => {
    dispatch(GetActorsInfo(kinopoiskId))
  }, [dispatch])
  return (<>
    <h4>Actors</h4>
    <ul className={style.actorsWrap}>
      {actors.slice(0, 11).map((actor: IActor) => {
         if (actor.professionKey === 'ACTOR') {
           return (<li className={style.actorsItem}>
             <img src={actor.posterUrl} alt="actor" key={actor.staffId} />
             <p>{actor.nameEn? actor.nameEn: actor.nameRu}</p>
           </li>)
         }
      })}
    </ul>
  </>)
}
export default ActorsInfo