import type { IFavoriteMovie } from "../model/types"

export const FAVORITES_STORAGE_KEY = "favorites"

/** Версия формата: при несовместимых изменениях увеличить и добавить миграцию в loadFavorites */
const VERSION = 1

interface IStored {
  version: number
  items: IFavoriteMovie[]
}

const isFavorite = (value: unknown): value is IFavoriteMovie =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as IFavoriteMovie).kinopoiskId === "number" &&
  typeof (value as IFavoriteMovie).addedAt === "number"

/** Повреждённые или чужие данные не роняют приложение: возвращается пустой список */
export const loadFavorites = (): IFavoriteMovie[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Partial<IStored>
    if (parsed.version !== VERSION || !Array.isArray(parsed.items)) return []
    return parsed.items.filter(isFavorite)
  } catch {
    return []
  }
}

export const saveFavorites = (items: IFavoriteMovie[]) => {
  try {
    const data: IStored = { version: VERSION, items }
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(data))
  } catch {
    // хранилище недоступно или переполнено: избранное останется до перезагрузки
  }
}
