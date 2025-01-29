import { Link } from 'react-router-dom';
import style from './Logo.module.scss'

const Logo = () => {
  return <Link to='/' className={style.logo}>KINOPOISK-clone</Link>
}
export default Logo;