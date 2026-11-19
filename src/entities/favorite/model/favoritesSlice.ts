import {
  createListenerMiddleware,
  createSlice,
  isAnyOf,
  type PayloadAction,
} from "@reduxjs/toolkit"
import { loadFavorites, saveFavorites } from "../lib/storage"
import type { IFavoriteMovie, IFavoritesState } from "./types"

const initialState: IFavoritesState = { items: loadFavorites() }

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    /** Добавить, если фильма нет; убрать, если есть */
    toggleFavorite(state, action: PayloadAction<Omit<IFavoriteMovie, "addedAt">>) {
      const { kinopoiskId } = action.payload
      const index = state.items.findIndex((m) => m.kinopoiskId === kinopoiskId)
      if (index >= 0) state.items.splice(index, 1)
      else state.items.unshift({ ...action.payload, addedAt: Date.now() })
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter((m) => m.kinopoiskId !== action.payload)
    },
    clearFavorites(state) {
      state.items = []
    },
    /** Замена списка целиком: синхронизация с другой вкладкой. В localStorage не пишет */
    setFavorites(state, action: PayloadAction<IFavoriteMovie[]>) {
      state.items = action.payload
    },
  },
})

export const { toggleFavorite, removeFavorite, clearFavorites, setFavorites } =
  favoritesSlice.actions
export default favoritesSlice.reducer

/** Сохраняет избранное в localStorage после каждого изменения (подключается в app/model/store) */
export const favoritesListener = createListenerMiddleware()
favoritesListener.startListening({
  matcher: isAnyOf(toggleFavorite, removeFavorite, clearFavorites),
  effect: (_, api) => {
    saveFavorites((api.getState() as { favorites: IFavoritesState }).favorites.items)
  },
})
