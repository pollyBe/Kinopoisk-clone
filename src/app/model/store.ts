import { configureStore } from "@reduxjs/toolkit"
import { movieReducer, moviesReducer } from "@/entities/movie"
import { actorReducer, actorsReducer } from "@/entities/person"
import { filtersReducer } from "@/entities/dictionary"
import { filteredMoviesReducer } from "@/features/filter-movies"
import { searchReducer } from "@/features/search-movies"
import { themeReducer } from "@/features/toggle-theme"
import { isActiveReducer } from "@/widgets/navbar"
import { sliderReducer } from "@/widgets/top-slider"

const store = configureStore({
  reducer: {
    theme: themeReducer,
    movies: moviesReducer,
    isActive: isActiveReducer,
    slider: sliderReducer,
    filters: filtersReducer,
    filteredMovies: filteredMoviesReducer,
    movie: movieReducer,
    search: searchReducer,
    actors: actorsReducer,
    actor: actorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Глобальные типы для typed-хуков в shared/lib/store: нижние слои не импортируют app
declare global {
  type RootState = ReturnType<typeof store.getState>
  type AppDispatch = typeof store.dispatch
}

export default store
