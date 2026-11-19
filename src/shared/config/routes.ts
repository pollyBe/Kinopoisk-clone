export const ROUTES = {
  home: "/",
  collection: (slug: string) => `/collection/${slug}`,
  search: "/search",
  discover: "/discover",
  movie: (id: number | string) => `/movie/${id}`,
  actor: (id: number | string) => `/actor/${id}`,
  notFound: "/not-found",
} as const
