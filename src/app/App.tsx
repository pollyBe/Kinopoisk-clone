import { Navigate, Route, Routes } from "react-router-dom"
import "./styles/App.css"
import MainLayout from "./layouts/MainLayout"
import { CollectionPage } from "@/pages/collection"
import { DiscoverPage } from "@/pages/discover"
import { SearchPage } from "@/pages/search"
import { MoviePage } from "@/pages/movie"
import { ActorPage } from "@/pages/actor"
import { NotFoundPage } from "@/pages/not-found"
import { ROUTES } from "@/shared/config"

/** Старые адреса → новые, чтобы не ломать сохранённые ссылки */
const LEGACY_REDIRECTS: Record<string, string> = {
  "/popularTVShows": ROUTES.collection("tv-shows"),
  "/vampires": ROUTES.collection("vampires"),
  "/comics": ROUTES.collection("comics"),
  "/top-popular-for-all-time": ROUTES.collection("top-popular"),
  "/collection/top-250-movies": ROUTES.home,
  "/search-results": ROUTES.search,
  "/custom-filter": ROUTES.discover,
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<CollectionPage />} />
        <Route path="/collection/:slug" element={<CollectionPage />} />
        <Route path={ROUTES.discover} element={<DiscoverPage />} />
        <Route path={ROUTES.search} element={<SearchPage />} />
        {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/movie/:kinopoiskId" element={<MoviePage />} />
      <Route path="/actor/:staffId" element={<ActorPage />} />
    </Routes>
  )
}

export default App
