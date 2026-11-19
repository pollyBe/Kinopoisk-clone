import { useSearchParams } from "react-router-dom"

/** Номер страницы из ?page= (по умолчанию 1); setPage сохраняет остальные параметры */
export const usePageParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const raw = Number(searchParams.get("page"))
  const page = Number.isInteger(raw) && raw > 0 ? raw : 1

  const setPage = (next: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (next <= 1) params.delete("page")
      else params.set("page", String(next))
      return params
    })
  }

  return [page, setPage] as const
}
