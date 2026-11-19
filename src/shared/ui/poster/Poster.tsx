import { useState } from "react"
import { FilmIcon } from "../icons"
import style from "./Poster.module.scss"

interface IProps {
  src?: string
  alt: string
  className?: string
  /** Для картинок в первом экране — "eager" */
  loading?: "lazy" | "eager"
}

/** Постер с заглушкой, если картинки нет или она не загрузилась */
const Poster = ({ src, alt, className, loading = "lazy" }: IProps) => {
  const [failedSrc, setFailedSrc] = useState<string>()
  const classes = [style.poster, className].filter(Boolean).join(" ")

  if (!src || failedSrc === src) {
    return (
      <div className={`${classes} ${style.placeholder}`} role="img" aria-label={alt}>
        <FilmIcon className={style.icon} aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      className={classes}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  )
}

export default Poster
