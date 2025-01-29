import style from './Title.module.scss'
import { ITitleProps } from '../../types/types'

const Title = ({title}:ITitleProps) => {
  return <h1 className={style.title}>{title}</h1>
}
export default Title