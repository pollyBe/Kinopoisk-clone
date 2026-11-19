/*
 * Постеры из API (kinopoiskapiunofficial.tech/images/posters/...) отдаются через цепочку
 * редиректов: kinopoiskapiunofficial.tech → 301 → st.kp.yandex.net → 302 → avatars.mds.yandex.net.
 * Первый редирект постоянный и предсказуемый, поэтому сразу просим второй адрес —
 * на мобильной сети это экономит один запрос к ещё одному хосту.
 * Если схема адресов изменится, Poster откатится на исходный URL (см. getPosterCandidates).
 */
const RULES: [RegExp, string][] = [
  [
    /^https:\/\/kinopoiskapiunofficial\.tech\/images\/posters\/kp_small\/(\d+)\.jpg$/,
    "https://st.kp.yandex.net/images/film_iphone/iphone360_$1.jpg",
  ],
  [
    /^https:\/\/kinopoiskapiunofficial\.tech\/images\/posters\/kp\/(\d+)\.jpg$/,
    "https://st.kp.yandex.net/images/film_big/$1.jpg",
  ],
]

/** Адреса для попыток загрузки по порядку: сначала короткий путь, затем исходный */
export const getPosterCandidates = (src: string): string[] => {
  for (const [pattern, replacement] of RULES) {
    if (pattern.test(src)) return [src.replace(pattern, replacement), src]
  }
  return [src]
}
