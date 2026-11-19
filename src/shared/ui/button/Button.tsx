import style from "./Button.module.scss"

export interface IButtonProps {
  text: string
  type: "button" | "submit"
  onClick?: () => void
}

const Button = ({ text, type, onClick }: IButtonProps) => {
  return (
    <button className={style.button} type={type} onClick={onClick}>
      {text}
    </button>
  )
}
export default Button
