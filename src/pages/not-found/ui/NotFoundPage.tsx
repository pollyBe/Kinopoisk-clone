import { Link } from "react-router-dom"
import { ROUTES } from "@/shared/config"
import { Title } from "@/shared/ui/title"
import style from "./NotFoundPage.module.scss"

const NotFoundPage = () => {
  return (
    <div className={style.container}>
      <Title title="404" />
      <p>Страница не найдена</p>
      <Link to={ROUTES.home} className={style.link}>
        На главную
      </Link>
    </div>
  )
}
export default NotFoundPage
