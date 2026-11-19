import { Button } from "../button"
import style from "./Status.module.scss"

interface IProps {
  message?: string
  onRetry?: () => void
  compact?: boolean
}

const ErrorState = ({
  message = "Не удалось загрузить данные. Проверьте подключение и попробуйте ещё раз.",
  onRetry,
  compact,
}: IProps) => (
  <div className={`${style.status} ${compact ? style.compact : ""}`} role="alert">
    <p className={style.error}>{message}</p>
    {onRetry && <Button type="button" text="Повторить" onClick={onRetry} />}
  </div>
)

export default ErrorState
