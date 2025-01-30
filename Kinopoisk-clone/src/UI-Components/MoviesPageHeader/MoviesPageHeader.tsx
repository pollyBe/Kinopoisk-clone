import Title from '../Title/Title'
import style from './MoviesPageHeader.module.scss'

interface IProps{
  value: string,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  title: string,
}

const MoviesPageHeader = ({ value, onChange, title }: IProps) => {
  return (<>
          <div className={style.titleWrap}>
          <Title title={title} />
          <p>Рейтинг составлен по результатам голосования посетителей сайта. Любой желающий может принять в нем участие, проголосовав за свой любимый фильм.</p>
        </div>
        <div className={style.sortingWrap}>
        <label>Sort by:</label>
        <select value={value} onChange={onChange}>
          <option value={""}>As it is</option>
          <option value={"nameRu"}>Title</option>
          <option value={"YEAR"}>Year</option>
        </select>
        </div></>)
}
export default MoviesPageHeader