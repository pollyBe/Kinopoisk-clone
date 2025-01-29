import Title from "../../UI-Components/Title/Title";
import { IMovie } from "../../types/types"
import style from './SelectedMovie.module.scss'

const SelectedMovie = ({ posterUrl, nameRu, nameEn, ratingImdb, ratingKinopoisk, ratingAgeLimits, countries, genres, year, type, description }: IMovie) => {
  const {movieContainer, leftWrap, imgWrap, rightWrap, raitingsWrap, age, nameAlt, infoWrap, countriesWrap, genresWrap, yearInfo, typeInfo, descriptionWrap} = style;
  return (<div className={movieContainer}>
    <div className={leftWrap}>
      <div className={imgWrap}>
        <img src={posterUrl} alt="poster" />
      </div>
    </div >
    <div className={rightWrap}>
      <Title title={nameEn === null ? nameRu:nameEn} />
      {nameEn ? <p className={nameAlt}>{nameEn}</p>:null}
      {ratingAgeLimits && <p className={age}>{ratingAgeLimits}+</p>}
      <ul className={raitingsWrap}>
        {ratingKinopoisk ? <li>Kinopoisk: {ratingKinopoisk}</li> : null}
        {ratingImdb ? <li>IMDB: {ratingImdb}</li>:null}
      </ul>
      <div className={infoWrap}>
      <ul className={countriesWrap}>Country:
        {countries && countries.map((el) => (
          <li key={el.country}>{el.country}</li>
        ))}
      </ul>
      <ul className={genresWrap}>Genres:
        {genres && genres.map((el) => (
          <li key={el.genre}> {el.genre}</li>
        ))}
      </ul>
      {year && <div className={yearInfo}>Year:<p>{year}</p></div>}
        {type && <div className={typeInfo}>Type:<p>{type}</p></div>}
      </div>
      <div className={descriptionWrap}>
        <p>{ description}</p>
      </div>

    </div>
  </div>)
}
export default SelectedMovie