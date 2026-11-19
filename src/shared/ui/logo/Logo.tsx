import { Link } from "react-router-dom"
import style from "./Logo.module.scss"

const Logo = () => (
  <Link to="/" className={style.logo} aria-label="Kinopoisk-clone — на главную">
    KINOPOISK<span>-clone</span>
  </Link>
)
export default Logo
