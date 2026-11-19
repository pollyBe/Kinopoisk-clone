import { Navigate, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import PageLayout from "./layouts/PageLayout"
import ScrollToTop from "./lib/ScrollToTop"
import {
  ActorPage,
  DiscoverPage,
  FavoritesPage,
  MoviePage,
  NotFoundPage,
  SearchPage,
} from "./lib/lazyPages"
import { CollectionPage } from "@/pages/collection"
import { useFavoritesSync } from "@/entities/favorite"
import { useThemeSync } from "@/features/toggle-theme"
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
  useThemeSync()
  useFavoritesSync()

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.home} element={<CollectionPage />} />
          <Route path="/collection/:slug" element={<CollectionPage />} />
          <Route path={ROUTES.discover} element={<DiscoverPage />} />
          <Route path={ROUTES.search} element={<SearchPage />} />
          <Route path={ROUTES.favorites} element={<FavoritesPage />} />
          {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
        </Route>
        <Route element={<PageLayout />}>
          <Route path="/movie/:kinopoiskId" element={<MoviePage />} />
          <Route path="/actor/:staffId" element={<ActorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
