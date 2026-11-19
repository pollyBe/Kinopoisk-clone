import { useState } from "react"
import { NavLink } from "react-router-dom"
import style from "./Navbar.module.scss"
import { AnglesLeftIcon as Left, AnglesRightIcon as Right, FilmIcon } from "@/shared/ui/icons"
import { FormOfFilters } from "@/features/filter-movies"
import { COLLECTIONS, collectionPath } from "@/shared/config"

const Navbar = () => {
  const [isActive, setIsActive] = useState(false)

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

  const closeNavBar = () => setIsActive(false)

  return (
    <div className={!isActive ? navbarWrap : `${navbarWrap} ${active}`}>
      <div className={navbar}>
        <h4>Choose your vibe</h4>
        <ul className={sortingWrap}>
          {COLLECTIONS.map(({ slug, navLabel }) => (
            <li key={slug} className={itemWrap}>
              <FilmIcon className={filmIcon} />
              <NavLink
                to={collectionPath(slug)}
                className={({ isActive }) => (isActive ? active : item)}
                onClick={closeNavBar}
              >
                {navLabel}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={filters}>
          <h4>Custom filter</h4>
          <FormOfFilters onSubmitClick={() => setIsActive(!isActive)} />
        </div>
      </div>
      <button className={openNavbarButton} onClick={() => setIsActive(!isActive)}>
        {!isActive ? <Right className={icon} /> : <Left className={icon} />}
      </button>
    </div>
  )
}

export default Navbar
