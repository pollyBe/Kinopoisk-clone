import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { selectFavoritesCount } from "@/entities/favorite"
import { FormOfFilters } from "@/features/filter-movies"
import { COLLECTIONS, collectionPath, ROUTES } from "@/shared/config"
import { useAppSelector } from "@/shared/lib/store"
import { AnglesLeftIcon as Left, AnglesRightIcon as Right, FilmIcon } from "@/shared/ui/icons"
import style from "./Navbar.module.scss"

const PANEL_ID = "collections-panel"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  // Форма фильтра (и запрос справочника жанров/стран) монтируется только после первого открытия
  const [wasOpened, setWasOpened] = useState(false)
  if (isOpen && !wasOpened) setWasOpened(true)
  const panelRef = useRef<HTMLElement>(null)
  const favoritesCount = useAppSelector(selectFavoritesCount)
  const { pathname, search } = useLocation()
  const { navbarWrap, open, navbar, sortingWrap, item, active } = style

  // При любом переходе панель закрывается
  useEffect(() => setIsOpen(false), [pathname, search])

  // Закрытая панель недоступна с клавиатуры и для скринридеров (React 18 не знает атрибут inert)
  useEffect(() => {
    if (panelRef.current) panelRef.current.inert = !isOpen
  }, [isOpen])

  // Escape закрывает панель
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const label = isOpen ? "Скрыть подборки и фильтр" : "Показать подборки и фильтр"

  return (
    <>
      {isOpen && <div className={style.backdrop} onClick={() => setIsOpen(false)} />}
      <div className={isOpen ? `${navbarWrap} ${open}` : navbarWrap}>
        <nav id={PANEL_ID} ref={panelRef} className={navbar} aria-label="Подборки и фильтр">
          <h2 className={style.heading}>Подборки</h2>
          <ul className={sortingWrap}>
            {COLLECTIONS.map(({ slug, navLabel }) => (
              <li key={slug}>
                <NavLink
                  to={collectionPath(slug)}
                  className={({ isActive }) => (isActive ? `${item} ${active}` : item)}
                  end
                >
                  <FilmIcon className={style.filmIcon} aria-hidden="true" />
                  {navLabel}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink
            to={ROUTES.favorites}
            className={({ isActive }) => `${item} ${style.favorites} ${isActive ? active : ""}`}
          >
            <span aria-hidden="true">♥</span>
            Избранное
            {favoritesCount > 0 && <span className={style.count}>{favoritesCount}</span>}
          </NavLink>
          <div className={style.filters}>
            <h2 className={style.heading}>Фильтр</h2>
            {wasOpened && <FormOfFilters onSubmitClick={() => setIsOpen(false)} />}
          </div>
        </nav>
        <button
          type="button"
          className={style.openNavbarButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={PANEL_ID}
          aria-label={label}
          title={label}
        >
          {isOpen ? (
            <Left className={style.icon} aria-hidden="true" />
          ) : (
            <Right className={style.icon} aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  )
}

export default Navbar
