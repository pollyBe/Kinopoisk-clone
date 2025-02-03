import style from './Button.module.scss'
import { IButtonProps } from '../../types/types'

const Button = ({text, type, onClick}:IButtonProps) => {
  return (
    <button
      className={style.button}
      type={type}
      onClick={onClick}>{text}</button>)
}
export default Button