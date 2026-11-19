import style from "./Button.module.scss"

export interface IButtonProps {
  text: string
  type: "button" | "submit"
  onClick?: () => void
  /** primary — заливка акцентом; dark — для тёмной шапки */
  variant?: "primary" | "dark"
  className?: string
}

const Button = ({ text, type, onClick, variant = "primary", className }: IButtonProps) => {
  const classes = [style.button, style[variant], className].filter(Boolean).join(" ")
  return (
    <button className={classes} type={type} onClick={onClick}>
      {text}
    </button>
  )
}
export default Button
