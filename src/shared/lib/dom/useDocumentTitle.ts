import { useEffect } from "react"

const APP_NAME = "Kinopoisk-clone"

/** Заголовок вкладки: «Матрица — Kinopoisk-clone»; без title — просто название приложения */
export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} — ${APP_NAME}` : APP_NAME
  }, [title])
}
