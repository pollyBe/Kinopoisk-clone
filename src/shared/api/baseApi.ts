import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_BASE_URL } from "@/shared/config"

/** Пустой API: эндпоинты добавляются в entities через injectEndpoints */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", import.meta.env.VITE_API_KEY)
      return headers
    },
  }),
  endpoints: () => ({}),
})
