const numberFormat = new Intl.NumberFormat("ru-RU")
const dateFormat = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
})
const pluralRules = new Intl.PluralRules("ru-RU")

/** 1234567 → «1 234 567» */
export const formatNumber = (value: number) => numberFormat.format(value)

/**
 * Склонение по числу: pluralize(5, ["голос", "голоса", "голосов"]) → «голосов».
 * Формы: [одна, несколько (2–4), много (5–20)]
 */
export const pluralize = (count: number, [one, few, many]: [string, string, string]) => {
  switch (pluralRules.select(count)) {
    case "one":
      return one
    case "few":
      return few
    default:
      return many
  }
}

/** «5 голосов», «1 234 567 голосов» */
export const formatCount = (count: number, forms: [string, string, string]) =>
  `${formatNumber(count)} ${pluralize(count, forms)}`

/** "1964-09-02" → «2 сентября 1964 г.»; нераспознанную строку возвращает как есть */
export const formatDate = (iso: string) => {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? iso : dateFormat.format(date)
}

/** 136 → «2 ч 16 мин», 45 → «45 мин» */
export const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (!h) return `${m} мин`
  return m ? `${h} ч ${m} мин` : `${h} ч`
}

/** «фантастика» → «Фантастика» */
export const capitalize = (text: string) =>
  text ? text.charAt(0).toLocaleUpperCase("ru-RU") + text.slice(1) : text
