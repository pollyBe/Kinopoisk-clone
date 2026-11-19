import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_BASE_URL } from "@/shared/config"

/** Пустой API: эндпоинты добавляются в entities через injectEndpoints */
export const baseApi = createApi({
  reducerPath: "api",
  // Ключ API подставляет прокси (api/kinopoisk.ts на Vercel, server.proxy в vite.config)
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: () => ({}),
})
