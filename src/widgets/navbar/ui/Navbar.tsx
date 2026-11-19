import { NavLink } from "react-router-dom"
import style from "./Navbar.module.scss"
import { AnglesLeftIcon as Left, AnglesRightIcon as Right, FilmIcon } from "@/shared/ui/icons"
import { FormOfFilters } from "@/features/filter-movies"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { switchIsActive } from "../model/isActiveSlice"

const Navbar = () => {
  const dispatch = useAppDispatch()
  const { isActive } = useAppSelector((state) => state.isActive)

  const {
    navbarWrap,
    navbar,
    sortingWrap,
    item,
    active,
    itemWrap,
    openNavbarButton,
    icon,
    filmIcon,
    filters,
  } = style

  const closeNavBar = () => dispatch(switchIsActive(false))

  return (
    <div className={!isActive ? navbarWrap : `${navbarWrap} ${active}`}>
      <div className={navbar}>
        <h4>Choose your vibe</h4>
        <ul className={sortingWrap}>
          <li className={itemWrap}>
            <FilmIcon className={filmIcon} />
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? active : item)}
              onClick={closeNavBar}
            >
              Top 250 Popular Movies
            </NavLink>
          </li>
          <li className={itemWrap}>
            <FilmIcon className={filmIcon} />
            <NavLink
              to="/popularTVShows"
              className={({ isActive }) => (isActive ? active : item)}
              onClick={closeNavBar}
            >
              Top Popular TV-Shows
            </NavLink>
          </li>
          <li className={itemWrap}>
            <FilmIcon className={filmIcon} />
            <NavLink
              to="/vampires"
              className={({ isActive }) => (isActive ? active : item)}
              onClick={closeNavBar}
            >
              Hoa Hoa Hoa Hoa (Vampires)
            </NavLink>
          </li>
          <li className={itemWrap}>
            <FilmIcon className={filmIcon} />
            <NavLink
              to="/comics"
              className={({ isActive }) => (isActive ? active : item)}
              onClick={closeNavBar}
            >
              Comics
            </NavLink>
          </li>
          <li className={itemWrap}>
            <FilmIcon className={filmIcon} />
            <NavLink
              to="/top-popular-for-all-time"
              className={({ isActive }) => (isActive ? active : item)}
              onClick={closeNavBar}
            >
              Top popular for all time
            </NavLink>
          </li>
        </ul>
        <div className={filters}>
          <h4>Custom filter</h4>
          <FormOfFilters onSubmitClick={() => dispatch(switchIsActive(!isActive))} />
        </div>
      </div>
      <button className={openNavbarButton} onClick={() => dispatch(switchIsActive(!isActive))}>
        {!isActive ? <Right className={icon} /> : <Left className={icon} />}
      </button>
    </div>
  )
}

export default Navbar
