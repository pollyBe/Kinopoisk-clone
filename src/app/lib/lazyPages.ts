import { lazy } from "react"

/*
 * Страницы грузятся отдельными чанками по требованию. Главная (CollectionPage) остаётся
 * в основном бандле: с неё начинается большинство визитов.
 */
export const DiscoverPage = lazy(() =>
  import("@/pages/discover").then((m) => ({ default: m.DiscoverPage })),
)
export const SearchPage = lazy(() =>
  import("@/pages/search").then((m) => ({ default: m.SearchPage })),
)
export const FavoritesPage = lazy(() =>
  import("@/pages/favorites").then((m) => ({ default: m.FavoritesPage })),
)
export const MoviePage = lazy(() => import("@/pages/movie").then((m) => ({ default: m.MoviePage })))
export const ActorPage = lazy(() => import("@/pages/actor").then((m) => ({ default: m.ActorPage })))
export const NotFoundPage = lazy(() =>
  import("@/pages/not-found").then((m) => ({ default: m.NotFoundPage })),
)
