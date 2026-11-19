import type { CSSProperties } from "react"
import style from "./Skeleton.module.scss"

interface IProps {
  width?: CSSProperties["width"]
  height?: CSSProperties["height"]
  radius?: CSSProperties["borderRadius"]
  className?: string
}

/** Заглушка-«шиммер» на время загрузки */
const Skeleton = ({ width = "100%", height = "1em", radius, className }: IProps) => (
  <span
    className={[style.skeleton, className].filter(Boolean).join(" ")}
    style={{ width, height, borderRadius: radius }}
    aria-hidden="true"
  />
)

export default Skeleton
