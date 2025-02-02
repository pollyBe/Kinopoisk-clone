import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../UI-Components/Button/Button";
import Title from "../../UI-Components/Title/Title";
import { IMovie, ISpouse } from "../../types/types";

import style from './ActorInfo.module.scss'

interface IActorProps{
  personId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: string;
  posterUrl: string;
  growth?: number;
  birthday?: string;
  death?: string;
  age?: number;
  birthplace?: string;
  deathplace?: string;
  spouses?: ISpouse[];
  hasAwards: number;
  profession: string;
  facts: string[];
  films: IMovie[];
}


const ActorInfo = ({
nameRu,
nameEn,
sex,
posterUrl,
growth,
birthday,
death,
age,
birthplace,
deathplace,
spouses,
hasAwards,
profession,
webUrl,
facts,
  films }: IActorProps) => {
  const {ActorInfoWrap,infoWrap,leftWrap, rightWrap , titleWrap,info,spousesList,factsWrap, filmsWrap,movieItem, filmsList}=style
  return (
    <div className={ActorInfoWrap}>
      <div className={infoWrap}>
        <div className={leftWrap}>
          <img src={posterUrl} alt="photo" />
        </div>
        <div className={rightWrap}>
          <div className={titleWrap}>
            <Title title={nameEn ? nameEn : nameRu} />
            {sex ? <p>{sex}</p> : null}
            {age ? <p>{age} years</p>:null}
          </div>
          <div className={info}>
            <p><b>Birhtday:</b> {birthday ? birthday : '---'}</p>
            <p><b>Place of birth:</b> {birthplace ? birthplace : '---'}</p>
            {death ?<p><b>Death:</b>  {death}</p>:null}
            {deathplace ? <p><b>Deathplace:</b>  {deathplace}</p> : null}
            <p><b>Growth:</b> {growth ? `${growth}sm` : '---'}</p>
            <p><b>Number of awards:</b> {hasAwards ? hasAwards : '---'}</p>
            <ul className={spousesList}><p><b>Spouses: </b> </p>
              {spouses && spouses.map((spouse)=> {
                return (<li key={spouse.personId}><p>{spouse.name}</p></li>)
              })
              }</ul>
            <p><b>Profession:</b> {profession}</p>
            <a target="_blank" href={ webUrl}><b>See more on kinopoisk</b></a>
          </div>
        </div>
      </div>
      <div className={factsWrap}>
        <h4>Some facts:</h4>
        {facts ? <p>{facts}</p>
        :<p>No information</p>}
      </div>
      <div className={filmsWrap}><h4>{nameEn || nameRu} films:</h4>
        <ul className={filmsList}>
          {films && films.slice(0,  26).map((film) => (
              <li key={film.filmId} className={movieItem}>
              <NavLink to={`/movie/${film.filmId}`}>
                <p>{film.nameRu ? film.nameRu : film.nameEn}</p>
              </NavLink>
               </li>
          ))}
        </ul>
      </div>
    </div>)
}
export default ActorInfo