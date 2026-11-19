import { useMemo, useState } from "react"
import { getPosterCandidates } from "@/shared/lib/image"
import { FilmIcon } from "../icons"
import style from "./Poster.module.scss"

interface IProps {
  src?: string
  alt: string
  className?: string
  /**
   * Картинка в первом экране (кандидат в LCP): грузится сразу и с высоким приоритетом.
   * Остальные — лениво.
   */
  priority?: boolean
}

/**
 * Постер: пробует адреса по очереди (короткий путь без редиректа, затем исходный),
 * а если ни один не загрузился — показывает заглушку.
 */
const Poster = ({ src, alt, className, priority = false }: IProps) => {
  const candidates = useMemo(() => (src ? getPosterCandidates(src) : []), [src])
  // Ошибки считаем для конкретного src: при смене картинки попытки начинаются заново
  const [failed, setFailed] = useState<{ src?: string; count: number }>({ count: 0 })
  const attempt = failed.src === src ? failed.count : 0
  const current = candidates[attempt]
  const classes = [style.poster, className].filter(Boolean).join(" ")

  if (!current) {
    return (
      <div className={`${classes} ${style.placeholder}`} role="img" aria-label={alt}>
        <FilmIcon className={style.icon} aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      className={classes}
      src={current}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // React 18 не знает fetchPriority, поэтому атрибут в нижнем регистре
      {...(priority ? { fetchpriority: "high" } : {})}
      onError={() => setFailed({ src, count: attempt + 1 })}
    />
  )
}

export default Poster
