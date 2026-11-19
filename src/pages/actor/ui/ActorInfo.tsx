import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { getMovieTitle, type IMovie } from "@/entities/movie"
import { getPersonName, type IPerson } from "@/entities/person"
import { ROUTES } from "@/shared/config"
import { formatCount, formatDate } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { Poster } from "@/shared/ui/poster"
import { Title } from "@/shared/ui/title"

import style from "./ActorInfo.module.scss"

const FILMS_PREVIEW = 30
const FACTS_PREVIEW = 5

/** Один фильм приходит несколько раз, если у человека в нём несколько профессий */
const uniqueFilms = (films: IMovie[] = []) => {
  const seen = new Set<number>()
  return films.filter((film) => {
    if (!film.filmId || seen.has(film.filmId)) return false
    seen.add(film.filmId)
    return true
  })
}

const ActorInfo = (person: IPerson) => {
  const {
    posterUrl,
    nameEn,
    growth,
    birthday,
    death,
    age,
    birthplace,
    deathplace,
    spouses,
    profession,
    webUrl,
    facts,
    films,
  } = person
  const name = getPersonName(person)
  const allFilms = useMemo(() => uniqueFilms(films), [films])
  const [showAll, setShowAll] = useState(false)
  const [showAllFacts, setShowAllFacts] = useState(false)
  const visibleFacts = showAllFacts ? facts : facts?.slice(0, FACTS_PREVIEW)
  const visibleFilms = showAll ? allFilms : allFilms.slice(0, FILMS_PREVIEW)

  const birth = birthday
    ? `${formatDate(birthday)}${age && !death ? ` (${formatCount(age, ["год", "года", "лет"])})` : ""}`
    : undefined

  const info: [string, string | undefined][] = [
    ["Карьера", profession],
    ["Дата рождения", birth],
    ["Место рождения", birthplace],
    ["Дата смерти", death ? formatDate(death) : undefined],
    ["Место смерти", deathplace],
    ["Рост", growth ? `${growth} см` : undefined],
    ["Супруги", spouses?.map((s) => s.name).join(", ") || undefined],
  ]

  return (
    <article className={style.actor}>
      <div className={style.top}>
        <div className={style.photo}>
          <Poster src={posterUrl} alt={`Фото: ${name}`} priority />
        </div>
        <div className={style.main}>
          <Title title={name} />
          {nameEn && nameEn !== name && <p className={style.original}>{nameEn}</p>}
          <dl className={style.info}>
            {info
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
          {webUrl && (
            <a className={style.external} href={webUrl} target="_blank" rel="noopener noreferrer">
              Подробнее на Кинопоиске ↗
            </a>
          )}
        </div>
      </div>

      {facts?.length > 0 && (
        <section className={style.section} aria-labelledby="facts-title">
          <h2 id="facts-title">Знаете ли вы, что…</h2>
          <ul className={style.facts}>
            {visibleFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          {facts.length > FACTS_PREVIEW && (
            <Button
              type="button"
              text={showAllFacts ? "Свернуть" : `Все факты (${facts.length})`}
              onClick={() => setShowAllFacts(!showAllFacts)}
            />
          )}
        </section>
      )}

      {allFilms.length > 0 && (
        <section className={style.section} aria-labelledby="films-title">
          <h2 id="films-title">
            Фильмография <span>{allFilms.length}</span>
          </h2>
          <ul className={style.films}>
            {visibleFilms.map((film) => (
              <li key={film.filmId}>
                <Link to={ROUTES.movie(film.filmId!)}>{getMovieTitle(film)}</Link>
                {film.rating && <span className={style.filmRating}>★ {film.rating}</span>}
              </li>
            ))}
          </ul>
          {allFilms.length > FILMS_PREVIEW && (
            <Button
              type="button"
              text={showAll ? "Свернуть" : `Показать все (${allFilms.length})`}
              onClick={() => setShowAll(!showAll)}
            />
          )}
        </section>
      )}
    </article>
  )
}
export default ActorInfo
