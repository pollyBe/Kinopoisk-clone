import { useEffect } from "react"
import { useAppDispatch } from "@/shared/lib/store"
import { setFavorites } from "../model/favoritesSlice"
import { FAVORITES_STORAGE_KEY, loadFavorites } from "./storage"

/** Подключается один раз в app: изменения избранного в другой вкладке сразу видны в этой */
export const useFavoritesSync = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === FAVORITES_STORAGE_KEY || e.key === null) dispatch(setFavorites(loadFavorites()))
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [dispatch])
}
