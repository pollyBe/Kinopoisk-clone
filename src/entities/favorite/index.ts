export type { IFavoriteMovie } from "./model/types"
export {
  default as favoritesReducer,
  favoritesListener,
  toggleFavorite,
  removeFavorite,
  clearFavorites,
} from "./model/favoritesSlice"
export { selectFavorites, selectFavoritesCount, selectIsFavorite } from "./model/selectors"
export { useFavoritesSync } from "./lib/useFavoritesSync"
