import { fileURLToPath, URL } from "node:url"
import { defineConfig, loadEnv, type ProxyOptions } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig(({ mode }) => {
  // Без префикса VITE_ переменная не попадает в клиентский бандл
  const { KINOPOISK_API_KEY } = loadEnv(mode, process.cwd(), "")

  // Локальная замена serverless-прокси из api/: путь /api/... у API совпадает с нашим
  const proxy: Record<string, ProxyOptions> = {
    "/api": {
      target: "https://kinopoiskapiunofficial.tech",
      changeOrigin: true,
      headers: { "X-API-KEY": KINOPOISK_API_KEY ?? "" },
    },
  }

  return {
    plugins: [react(), svgr()],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    server: { proxy },
    preview: { proxy },
  }
})
