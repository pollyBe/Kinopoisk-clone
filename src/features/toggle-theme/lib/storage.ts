export type Theme = "light" | "dark"

const KEY = "theme"
const DARK_QUERY = "(prefers-color-scheme: dark)"

/** Явный выбор пользователя; null — выбора не было, следуем системе */
export const readSavedTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(KEY)
    return value === "light" || value === "dark" ? value : null
  } catch {
    return null
  }
}

export const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // приватный режим или запрет хранилища: тема просто не запомнится
  }
}

export const getSystemTheme = (): Theme =>
  typeof matchMedia === "function" && matchMedia(DARK_QUERY).matches ? "dark" : "light"

export const subscribeToSystemTheme = (onChange: (theme: Theme) => void) => {
  if (typeof matchMedia !== "function") return () => {}
  const mq = matchMedia(DARK_QUERY)
  const handler = (e: MediaQueryListEvent) => onChange(e.matches ? "dark" : "light")
  mq.addEventListener("change", handler)
  return () => mq.removeEventListener("change", handler)
}

/** Тема, которую inline-скрипт в index.html уже поставил на <html> */
export const getInitialTheme = (): Theme => {
  const fromDom = document.documentElement.dataset.theme
  if (fromDom === "light" || fromDom === "dark") return fromDom
  return readSavedTheme() ?? getSystemTheme()
}
