import { Title } from "@/shared/ui/title"
import style from "./MoviesPageHeader.module.scss"

interface IProps {
  title: string
}

const MoviesPageHeader = ({ title }: IProps) => {
  return (
    <>
      <div className={style.titleWrap}>
        <Title title={title} />
        <p>
          Рейтинг составлен по результатам голосования посетителей сайта. Любой желающий может
          принять в нем участие, проголосовав за свой любимый фильм.
        </p>
      </div>
    </>
  )
}
export default MoviesPageHeader
