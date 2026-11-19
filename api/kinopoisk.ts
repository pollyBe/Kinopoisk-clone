/**
 * Serverless-прокси к kinopoiskapiunofficial.tech (Vercel Function).
 *
 * Клиент запрашивает /api/<путь API>?<параметры>, vercel.json переписывает это в
 * /api/kinopoisk?path=<путь API>&<параметры>. Ключ берётся из переменной окружения
 * KINOPOISK_API_KEY и в браузер не попадает.
 */

const UPSTREAM = "https://kinopoiskapiunofficial.tech/api"

/** Разрешённые эндпоинты: прокси не даёт тратить ключ на что-то другое */
const ALLOWED_PATHS = [
  /^v2\.2\/films$/, // фильтр (discover)
  /^v2\.2\/films\/filters$/, // справочник жанров и стран
  /^v2\.2\/films\/collections$/, // подборки
  /^v2\.2\/films\/\d+$/, // фильм по id
  /^v2\.1\/films\/search-by-keyword$/, // поиск
  /^v1\/staff$/, // съёмочная группа фильма
  /^v1\/staff\/\d+$/, // человек по id
]

/** CDN Vercel кэширует успешные ответы: данные меняются редко, а лимит запросов у ключа дневной */
const CACHE_OK = "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  })

/** Путь API: из ?path= (после rewrite) или из самого URL (/api/v2.2/...) */
export const resolvePath = (url: URL): string => {
  const fromQuery = url.searchParams.get("path")
  const raw = fromQuery ?? url.pathname.replace(/^\/api\/?/, "")
  return raw.replace(/^\/+|\/+$/g, "")
}

export const isAllowedPath = (path: string) => ALLOWED_PATHS.some((re) => re.test(path))

export async function GET(request: Request): Promise<Response> {
  const apiKey = process.env.KINOPOISK_API_KEY
  if (!apiKey) return json(500, { message: "KINOPOISK_API_KEY is not configured" })

  const url = new URL(request.url)
  const path = resolvePath(url)
  if (!isAllowedPath(path)) return json(404, { message: "Unknown endpoint" })

  const params = new URLSearchParams(url.searchParams)
  params.delete("path")
  const query = params.toString()
  const target = `${UPSTREAM}/${path}${query ? `?${query}` : ""}`

  let upstream: Response
  try {
    upstream = await fetch(target, {
      headers: { "X-API-KEY": apiKey, Accept: "application/json" },
    })
  } catch {
    return json(502, { message: "Upstream request failed" })
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
      "Cache-Control": upstream.ok ? CACHE_OK : "no-store",
    },
  })
}
