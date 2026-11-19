import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { setTheme } from "../model/themeSlice"
import { readSavedTheme, subscribeToSystemTheme } from "./storage"

/** Подключается один раз в app: тема из store → атрибут data-theme на <html> */
export const useThemeSync = () => {
  const theme = useAppSelector((state) => state.theme.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Пока пользователь сам не выбрал тему, следуем за системной
  useEffect(
    () =>
      subscribeToSystemTheme((systemTheme) => {
        if (!readSavedTheme()) dispatch(setTheme(systemTheme))
      }),
    [dispatch],
  )
}
