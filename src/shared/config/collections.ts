export interface ICollectionConfig {
  /** Часть URL: /collection/:slug */
  slug: string
  /** Значение параметра type в API /v2.2/films/collections */
  type: string
  /** Заголовок страницы */
  title: string
  /** Подпись в навбаре */
  navLabel: string
  /** Подзаголовок страницы подборки */
  description: string
}

const VOTING_NOTE =
  "Рейтинг составлен по результатам голосования посетителей Кинопоиска. Любой желающий может принять в нём участие, проголосовав за свой любимый фильм."

export const COLLECTIONS: ICollectionConfig[] = [
  {
    slug: "top-250-movies",
    type: "TOP_250_MOVIES",
    title: "250 лучших фильмов",
    navLabel: "250 лучших фильмов",
    description: VOTING_NOTE,
  },
  {
    slug: "tv-shows",
    type: "TOP_250_TV_SHOWS",
    title: "250 лучших сериалов",
    navLabel: "250 лучших сериалов",
    description: VOTING_NOTE,
  },
  {
    slug: "top-popular",
    type: "TOP_POPULAR_ALL",
    title: "Популярное сейчас",
    navLabel: "Популярное сейчас",
    description: "Фильмы и сериалы, которые сейчас чаще всего смотрят на Кинопоиске.",
  },
  {
    slug: "vampires",
    type: "VAMPIRE_THEME",
    title: "Фильмы про вампиров",
    navLabel: "Про вампиров",
    description: "Классика и новинки о вампирах: от готических драм до комедий.",
  },
  {
    slug: "comics",
    type: "COMICS_THEME",
    title: "Фильмы по комиксам",
    navLabel: "По комиксам",
    description: "Экранизации комиксов и графических романов.",
  },
]

/** Подборка, которая открывается на главной */
export const DEFAULT_COLLECTION = COLLECTIONS[0]

export const findCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)

/** Ссылка на подборку: для подборки по умолчанию это главная */
export const collectionPath = (slug: string) =>
  slug === DEFAULT_COLLECTION.slug ? "/" : `/collection/${slug}`
