import { getMovieTitle, getMovieTypeLabel, type IMovie } from "@/entities/movie"
import { ToggleFavoriteButton } from "@/features/toggle-favorite"
import { capitalize, formatCount, formatDuration } from "@/shared/lib/format"
import { Poster } from "@/shared/ui/poster"
import { Title } from "@/shared/ui/title"
import ActorsInfo from "./ActorsInfo"
import style from "./SelectedMovie.module.scss"

const VOTES: [string, string, string] = ["голос", "голоса", "голосов"]

/** "age18" → «18+» */
const formatAgeLimit = (value?: string) => {
  const digits = value?.replace(/\D/g, "")
  return digits ? `${digits}+` : ""
}

const SelectedMovie = (movie: IMovie) => {
  const {
    posterUrl,
    nameOriginal,
    ratingImdb,
    ratingKinopoisk,
    ratingAgeLimits,
    countries,
    genres,
    year,
    type,
    description,
    ratingImdbVoteCount,
    ratingKinopoiskVoteCount,
    filmLength,
    webUrl,
    kinopoiskId,
  } = movie
  const title = getMovieTitle(movie)
  const ageLimit = formatAgeLimit(ratingAgeLimits)

  const facts: [string, string | undefined][] = [
    ["Год", year ? String(year) : undefined],
    ["Тип", getMovieTypeLabel(type) || undefined],
    ["Страна", countries?.map((c) => c.country).join(", ") || undefined],
    ["Жанр", genres?.map((g) => g.genre).join(", ") || undefined],
    ["Время", filmLength ? formatDuration(filmLength) : undefined],
    ["Оригинальное название", nameOriginal && nameOriginal !== title ? nameOriginal : undefined],
  ]

  return (
    <article className={style.movie}>
      <div className={style.posterWrap}>
        <Poster src={posterUrl} alt={`Постер: ${title}`} priority />
      </div>

      <div className={style.info}>
        <div className={style.heading}>
          <Title title={title} />
          {ageLimit && (
            <span className={style.age} aria-label={`Возрастное ограничение ${ageLimit}`}>
              {ageLimit}
            </span>
          )}
        </div>

        {(ratingKinopoisk || ratingImdb) && (
          <ul className={style.ratings} aria-label="Рейтинги">
            {ratingKinopoisk ? (
              <li>
                <b>Кинопоиск {ratingKinopoisk.toFixed(1)}</b>
                {ratingKinopoiskVoteCount ? (
                  <span>{formatCount(ratingKinopoiskVoteCount, VOTES)}</span>
                ) : null}
              </li>
            ) : null}
            {ratingImdb ? (
              <li>
                <b>IMDb {ratingImdb.toFixed(1)}</b>
                {ratingImdbVoteCount ? (
                  <span>{formatCount(ratingImdbVoteCount, VOTES)}</span>
                ) : null}
              </li>
            ) : null}
          </ul>
        )}

        <div className={style.columns}>
          <dl className={style.facts}>
            {facts
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{label === "Жанр" ? capitalize(value!) : value}</dd>
                </div>
              ))}
          </dl>
          <ActorsInfo kinopoiskId={kinopoiskId} />
        </div>

        <p className={style.description}>{description || "Описание пока не добавлено."}</p>

        <div className={style.actionsRow}>
          <ToggleFavoriteButton movie={movie} variant="full" />
        </div>

        {webUrl && (
          <a className={style.external} href={webUrl} target="_blank" rel="noopener noreferrer">
            Смотреть на Кинопоиске ↗
          </a>
        )}
      </div>
    </article>
  )
}
export default SelectedMovie
