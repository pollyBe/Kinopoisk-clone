import { useNavigate } from "react-router-dom"
import { Button } from "../button"

/**
 * «Назад» по истории. Если страницу открыли по прямой ссылке (истории внутри сайта нет),
 * ведёт на главную, а не уводит с сайта.
 */
const BackButton = () => {
  const navigate = useNavigate()

  const goBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (idx > 0) navigate(-1)
    else navigate("/")
  }

  return <Button type="button" text="← Назад" onClick={goBack} />
}

export default BackButton
