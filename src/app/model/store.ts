import { configureStore } from "@reduxjs/toolkit"
import { themeReducer } from "@/features/toggle-theme"
import { baseApi } from "@/shared/api"

const store = configureStore({
  reducer: {
    // серверные данные: кэш RTK Query (эндпоинты — в entities/*/api)
    [baseApi.reducerPath]: baseApi.reducer,
    // клиентское состояние
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Глобальные типы для typed-хуков в shared/lib/store: нижние слои не импортируют app
declare global {
  type RootState = ReturnType<typeof store.getState>
  type AppDispatch = typeof store.dispatch
}

export default store
