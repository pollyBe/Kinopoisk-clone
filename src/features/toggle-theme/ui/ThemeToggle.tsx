import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { saveTheme } from "../lib/storage"
import { setTheme } from "../model/themeSlice"
import style from "./ThemeToggle.module.scss"

const ThemeToggle = () => {
  const theme = useAppSelector((state) => state.theme.theme)
  const dispatch = useAppDispatch()
  const isDark = theme === "dark"
  const label = isDark ? "Включить светлую тему" : "Включить тёмную тему"

  const toggle = () => {
    const next = isDark ? "light" : "dark"
    saveTheme(next)
    dispatch(setTheme(next))
  }

  return (
    <button
      type="button"
      className={style.toggle}
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        // солнце
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" />
        </svg>
      ) : (
        // луна
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
