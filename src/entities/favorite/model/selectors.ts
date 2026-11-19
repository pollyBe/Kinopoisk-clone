export const selectFavorites = (state: RootState) => state.favorites.items

export const selectFavoritesCount = (state: RootState) => state.favorites.items.length

export const selectIsFavorite = (state: RootState, kinopoiskId: number) =>
  state.favorites.items.some((m) => m.kinopoiskId === kinopoiskId)
