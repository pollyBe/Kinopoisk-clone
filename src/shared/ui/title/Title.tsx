import style from "./Title.module.scss"

export interface ITitleProps {
  title: string | undefined
}

const Title = ({ title }: ITitleProps) => {
  return <h1 className={style.title}>{title}</h1>
}
export default Title
