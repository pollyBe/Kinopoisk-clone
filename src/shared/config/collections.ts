export interface ICollectionConfig {
  /** Часть URL: /collection/:slug */
  slug: string
  /** Значение параметра type в API /v2.2/films/collections */
  type: string
  /** Заголовок страницы */
  title: string
  /** Подпись в навбаре */
  navLabel: string
}

export const COLLECTIONS: ICollectionConfig[] = [
  {
    slug: "top-250-movies",
    type: "TOP_250_MOVIES",
    title: "Top 250 Popular Movies",
    navLabel: "Top 250 Popular Movies",
  },
  {
    slug: "tv-shows",
    type: "TOP_250_TV_SHOWS",
    title: "Top 250 TV Shows",
    navLabel: "Top Popular TV-Shows",
  },
  {
    slug: "vampires",
    type: "VAMPIRE_THEME",
    title: "Hoa hoa hoa hoa(Vampires)",
    navLabel: "Hoa Hoa Hoa Hoa (Vampires)",
  },
  { slug: "comics", type: "COMICS_THEME", title: "Comics", navLabel: "Comics" },
  {
    slug: "top-popular",
    type: "TOP_POPULAR_ALL",
    title: "Top popular for all time",
    navLabel: "Top popular for all time",
  },
]

/** Подборка, которая открывается на главной */
export const DEFAULT_COLLECTION = COLLECTIONS[0]

export const findCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)

/** Ссылка на подборку: для подборки по умолчанию это главная */
export const collectionPath = (slug: string) =>
  slug === DEFAULT_COLLECTION.slug ? "/" : `/collection/${slug}`
