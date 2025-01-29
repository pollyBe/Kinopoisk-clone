import { NavLink } from "react-router-dom"
import style from './Navbar.module.scss'
import FilmIcon from '../../assets/icons/film-solid.svg?react'
import { useDispatch, useSelector } from "react-redux";
import { switchIsActive } from "../../store/isActiveSlice";
import Right from '../../assets/icons/angles-right-solid.svg?react'
import Left from '../../assets/icons/angles-left-solid.svg?react'

const Navbar = () => {
  const { navbarWrap,navbar, sortingWrap, typesWrap, item, active, itemWrap, openNavbarButton, icon, filmIcon} = style;
  const dispatch = useDispatch()
  const closeNavBar = () => dispatch(switchIsActive(false))
  const { isActive } = useSelector((state:any) => state.isActive)
  const myClass =
  () =>
  ({ isActive }: { isActive: boolean }) =>
    isActive ? `${active}` : `${item}`;
  return (
    <div   className={
      !isActive ? navbarWrap : `${navbarWrap} ${active}`
    }>
      <div className={navbar}>
      <h4>Choose your vibe</h4>
      <ul className={sortingWrap}>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/' className={myClass()} onClick={closeNavBar}>Top 250 Popular Movies</NavLink></li>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/PolpularTVShows' className={myClass()} onClick={closeNavBar}>Top Popular TV-Shows</NavLink></li>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/vampires' className={myClass()} onClick={closeNavBar}>Hoa Hoa Hoa Hoa(Vampires)</NavLink></li>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/comics' className={myClass()} onClick={closeNavBar}>Comics</NavLink></li>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/family' className={myClass()} onClick={closeNavBar}>For family evenings</NavLink></li>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/oscar-winners' className={myClass()} onClick={closeNavBar}>Oscar winners</NavLink></li>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/love' className={myClass()} onClick={closeNavBar}>Love is in the air</NavLink></li>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/zombies' className={myClass()} onClick={closeNavBar}>Zombies</NavLink></li>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/catastrophes' className={myClass()} onClick={closeNavBar}>Catastrophes</NavLink></li>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/for-kids' className={myClass()} onClick={closeNavBar}>For kids</NavLink></li>
      </ul>
      <ul className={typesWrap}>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/movies' className={myClass()} onClick={closeNavBar}>Movies</NavLink></li>
        <li className={itemWrap}><FilmIcon className={filmIcon} />
          <NavLink to='/series' className={myClass()} onClick={closeNavBar}>Series</NavLink></li>
      </ul>
      </div>
      <button className={openNavbarButton} onClick={() => dispatch(switchIsActive(isActive ? false : true))}>{!isActive?<Right className={icon} />:<Left className={icon}/>}</button>
    </div>
 )
}
export default Navbar