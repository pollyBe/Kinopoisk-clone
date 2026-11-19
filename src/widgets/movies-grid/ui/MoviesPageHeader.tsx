import { Title } from "@/shared/ui/title"
import style from "./MoviesPageHeader.module.scss"

interface IProps {
  title: string
  description?: string
}

const MoviesPageHeader = ({ title, description }: IProps) => (
  <div className={style.titleWrap}>
    <Title title={title} />
    {description && <p>{description}</p>}
  </div>
)
export default MoviesPageHeader
