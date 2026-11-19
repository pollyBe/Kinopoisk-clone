import type { ReactNode } from "react"
import style from "./Status.module.scss"

interface IProps {
  message: string
  /** Например, ссылка «На главную» */
  children?: ReactNode
}

const EmptyState = ({ message, children }: IProps) => (
  <div className={style.status}>
    <p>{message}</p>
    {children}
  </div>
)

export default EmptyState
