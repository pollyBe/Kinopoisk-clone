import { NavLink } from "react-router-dom";
import style from './Navbar.module.scss';
import FilmIcon from '../../assets/icons/film-solid.svg?react';
import { useDispatch, useSelector } from "react-redux";
import { switchIsActive } from "../../store/isActiveSlice";
import Right from '../../assets/icons/angles-right-solid.svg?react';
import Left from '../../assets/icons/angles-left-solid.svg?react';
import FormOfFilters from "../FormOfFilters/FormOfFilters";
import { AppDispatch, RootState } from "../../store";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isActive } = useSelector((state: RootState) => state.isActive);

  const { navbarWrap, navbar, sortingWrap, item, active, itemWrap, openNavbarButton, icon, filmIcon, filters } = style;

  const closeNavBar = () => dispatch(switchIsActive(false));

  return (
    <div  className={!isActive ? navbarWrap : `${navbarWrap} ${active}`}>
      <div className={navbar}>
        <h4>Choose your vibe</h4>
        <ul className={sortingWrap}>
          <li className={itemWrap}>
            <FilmIcon className={filmIcon} />
            <NavLink to='/' className={({ isActive }) => (isActive ? active : item)} onClick={closeNavBar}>
              Top 250 Popular Movies
            </NavLink>
          </li>
          <li className={itemWrap}>
            <FilmIcon className={filmIcon} />
            <NavLink to='/popularTVShows' className={({ isActive }) => (isActive ? active : item)} onClick={closeNavBar}>
              Top Popular TV-Shows
            </NavLink>
          </li>
          <li className={itemWrap}>
            <FilmIcon className={filmIcon} />
            <NavLink to='/vampires' className={({ isActive }) => (isActive ? active : item)} onClick={closeNavBar}>
              Hoa Hoa Hoa Hoa (Vampires)
            </NavLink>
          </li>
          <li className={itemWrap}>
            <FilmIcon className={filmIcon} />
            <NavLink to='/comics' className={({ isActive }) => (isActive ? active : item)} onClick={closeNavBar}>
              Comics
            </NavLink>
          </li>
          <li className={itemWrap}>
            <FilmIcon className={filmIcon} />
            <NavLink to='/top-popular-for-all-time' className={({ isActive }) => (isActive ? active : item)} onClick={closeNavBar}>
              Top popular for all time
            </NavLink>
          </li>
        </ul>
        <div className={filters}>
          <h4>Custom filter</h4>
          <FormOfFilters />
        </div>
      </div>
      <button className={openNavbarButton} onClick={() => dispatch(switchIsActive(!isActive))}>
        {!isActive ? <Right className={icon} /> : <Left className={icon} />}
      </button>
    </div>
  );
};

export default Navbar;
