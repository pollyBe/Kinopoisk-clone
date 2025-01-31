import Title from "../../UI-Components/Title/Title";
import { IMovie } from "../../types/types"
import style from './SelectedMovie.module.scss'

const SelectedMovie = ({ nameRu, posterUrl, nameOriginal, ratingImdb, ratingKinopoisk, ratingAgeLimits, countries, genres, year, type, description, ratingImdbVoteCount, ratingKinopoiskVoteCount, filmLength, webUrl }: IMovie) => {
  const {movieContainer, leftWrap, imgWrap, rightWrap, raitingsWrap, age, infoWrap, countriesWrap, genresWrap, yearInfo, typeInfo, descriptionWrap, lengthWrap, webUrlWrap, originalNameWrap} = style;
  return (<div className={movieContainer}>
    <div className={leftWrap}>
      <div className={imgWrap}>
        <img src={posterUrl} alt="poster" />
      </div>
    </div >
    <div className={rightWrap}>
      <Title title={nameRu === null ? nameOriginal:nameRu} />
      {ratingAgeLimits && <p className={age}>{ratingAgeLimits}+</p>}
      <ul className={raitingsWrap}>
        {ratingKinopoisk ? <li>Kinopoisk: {ratingKinopoisk}<p> ({ratingKinopoiskVoteCount})</p></li> : null}
        {ratingImdb ? <li>IMDB: {ratingImdb}<p> ({ratingImdbVoteCount})</p></li>:null}
      </ul>
      <div className={infoWrap}>
      <div className={lengthWrap}>
        {filmLength && <p><b>Length:</b> {filmLength} min</p>}
      </div>
        <div className={originalNameWrap}>
        {nameOriginal ? <p><b>Original name:</b> {nameOriginal}</p>:null}
        </div>
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
        {description ? <p>{description}</p> : <p>Sorry. Will be updated soon.</p>}
      </div>
      <div className={webUrlWrap}>
        {webUrl && <a href={webUrl} target='_blank'>Watch on Kinopoisk</a>}
      </div>
    </div>
  </div>)
}
export default SelectedMovie