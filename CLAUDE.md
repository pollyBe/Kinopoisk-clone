# Kinopoisk-clone: заметки для Claude

## О проекте

Проект для портфолио: каталог фильмов и сериалов на базе kinopoiskapiunofficial.tech.
Есть поиск, подборки, фильтры, страница фильма с актёрами и страница актёра.

**Принятые решения (2026-11-19):**

- На Next **не мигрируем**, остаёмся на React + Vite (SPA).
- Деплой переносим на **Vercel** (вместо GitHub Pages и Netlify).
- Архитектура: **Feature-Sliced Design (FSD)**.
- Цель — «вылизать» проект, чтобы его было не стыдно показать: чистый код, аккуратный UI, хороший README.

## Стек

- React 18, TypeScript (strict), Vite 6, SCSS-модули
- Redux Toolkit → переходим на **RTK Query** (серверное состояние); в Redux остаётся только клиентское состояние (тема, UI)
- react-router v7
- Swiper (слайдер)

## Команды

- `npm run dev` — dev-сервер
- `npm run build` — `tsc && tsc -p api && vite build` (проверка типов клиента и serverless-функции)
- `npm run lint` — ESLint (`eslint .`)
- `npm run lint:fsd` — steiger (проверка правил FSD)
- `npm run format` / `npm run format:check` — Prettier
- Тестов пока нет: jest удалён, Vitest добавим в фазе 5

## Env

- `KINOPOISK_API_KEY` — ключ kinopoiskapiunofficial.tech. Только на сервере: в `.env` для локальной разработки и в Environment Variables проекта на Vercel. **Никогда не давать ему префикс `VITE_`**: такие переменные попадают в клиентский бандл.
- Клиент ходит в `/api/<путь API>` без ключа (`API_BASE_URL` в `shared/config/api.ts`).
  - Прод: `vercel.json` переписывает `/api/*` → `api/kinopoisk.ts` (serverless-функция подставляет ключ; пропускает только GET и эндпоинты из `ALLOWED_PATHS`; успешные ответы кэшируются на CDN на час).
  - Локально (`npm run dev`, `npm run preview`): `server.proxy` в `vite.config.ts` подставляет ключ из `.env`.
- Новый эндпоинт API = добавить его в `ALLOWED_PATHS` в `api/kinopoisk.ts`, иначе прокси ответит 404.

## Целевая структура FSD

```
src/
  app/          # main.tsx, App.tsx (роуты), layouts/, model/store.ts, styles/ (глобальные стили и фоновые картинки)
  pages/        # collection (и главная), movie, actor, search, discover (фильтр), not-found, favorites
  widgets/      # header (+ форма поиска), footer, navbar, top-slider, movies-grid
  features/     # filter-movies (форма, URL-параметры, справочник жанров/стран), toggle-theme, toggle-favorite
  entities/     # movie (api, model/types, ui: MovieCard, MovieCardSkeleton), person (актёр, съёмочная группа), favorite
  shared/       # api (baseApi RTK Query), ui (Button, Input, Select, Title, Logo, Pagination, icons, Skeleton, ErrorState, EmptyState),
                # config (routes, env), lib (store-хуки, format), styles (tokens, mixins)
public/         # favicon и прочая статика без обработки
api/            # serverless-функции Vercel (прокси к Kinopoisk API), лежат вне src
```

### Правила FSD (соблюдать всегда)

- Импорты идут только вниз: app → pages → widgets → features → entities → shared.
- Слайсы одного слоя не импортируют друг друга (для связей между entities — `@x`-нотация, и только при реальной необходимости).
- Каждый слайс наружу отдаёт только свой `index.ts` (public API). Глубокие импорты запрещены.
- Сегменты внутри слайса: `ui/`, `model/`, `api/`, `lib/`, `config/`.
- Алиас `@/` указывает на `src/`.
- Проверка — `steiger` (линтер FSD), запускается в CI.
- Слайс, который используется только в одном месте, сливается с потребителем (правило steiger `insignificant-slice`): компонент одной страницы живёт в `pages/<page>/ui`, форма поиска — в `widgets/header`, справочник жанров/стран — в `features/filter-movies`.
- Серверные данные — только через RTK Query (`baseApi.injectEndpoints` в `entities/*/api`). В Redux лежит лишь клиентское состояние (тема, позже избранное). Состояние одного компонента — `useState`.
- Маршруты — `ROUTES` из `@/shared/config`, подборки — `COLLECTIONS`; номер страницы в URL — хук `usePageParam` из `@/shared/lib/url`.
- Redux-хуки: `useAppDispatch` и `useAppSelector` из `@/shared/lib/store`. Типы `RootState` и `AppDispatch` объявлены глобально в `app/model/store.ts`, потому что нижние слои не могут импортировать app.
- Steiger запрещает сегменты `store`, `providers`, `hooks`, `components`, `assets` и т. п.: сегмент называют по назначению (`model`, `ui`, `lib`).

### Соглашения

- Имена слайсов и папок — kebab-case, компонентов — PascalCase.
- Источник правды для страницы, фильтров и поискового запроса — **URL** (search params), а не Redux и не `location.state`.
- У каждого запроса данных есть три состояния: skeleton, error (с кнопкой retry) и empty.
- У картинок осмысленный `alt`, `loading="lazy"` и заглушка на случай ошибки — компонент `Poster` из `@/shared/ui/poster`.
- Цвета, отступы, радиусы и размеры шрифта — только CSS-переменные из `src/app/styles/tokens.css` (`var(--color-text)`, `var(--space-4)`…). Тёмная тема переопределяет цветовые токены через `[data-theme="dark"]` на `<html>`; новые цвета добавлять в обе темы.
- Ширина контейнера страницы: `width: min(var(--container-width), 100% - 2 * var(--gutter)); margin-inline: auto`. Брейкпоинты: 480 / 768 / 1024px.
- Тема: inline-скрипт в `index.html` ставит `data-theme` до загрузки React (без вспышки); `features/toggle-theme` хранит выбор в localStorage, а без выбора следует `prefers-color-scheme`.
- Весь интерфейс на русском. Числа — `formatNumber`/`formatCount` из `@/shared/lib/format` (ru-RU, склонения через `Intl.PluralRules`), даты — `formatDate`, длительность — `formatDuration`. Типы из API — `getMovieTypeLabel`.
- Состояния: `ErrorState` (с `onRetry={refetch}`) и `EmptyState` из `@/shared/ui/status`, заглушки загрузки — `Skeleton`. В `MoviesList` состояние вместо сетки передаётся пропом `status`.
- Картинки — только через `Poster` (`priority` для первого экрана). Новые тяжёлые ассеты — в WebP с запасным форматом, не больше 1920px.
- MovieCard — `div` со ссылкой и слотом `actions` рядом: кнопки нельзя класть внутрь `<a>`.
- Заголовок вкладки — `useDocumentTitle` из `@/shared/lib/dom`; кнопка «Назад» — `BackButton` (без истории ведёт на главную).

## План работ

Статусы: `[ ]` — не начато, `[~]` — в процессе, `[x]` — готово.

### Фаза 0. Гигиена и подготовка

- [x] Закоммитить текущий WIP (рефакторинг MoviesList/isLoading и др.) отдельным коммитом
- [x] Убрать `dist/` из git, добавить в `.gitignore`
- [x] Удалить лишние зависимости: `react-slick`, `slick-carousel`, `@types/react-slick`, `redux-thunk` (уже есть в RTK), `util`, `@types/react-redux`, `react-images-uploading`, связку jest/babel
- [x] Перенести `vite-plugin-svgr` в devDependencies
- [x] Добавить в devDeps отсутствующие пакеты для eslint-конфига (`@eslint/js`, `globals`, `typescript-eslint`), починить скрипт `lint`
- [x] Prettier + единое форматирование
- [x] Алиас `@/` (tsconfig + vite)
- [x] Переименовать пакет (`kinogo-clone` → `kinopoisk-clone`)
- [ ] **Перевыпустить API-ключ**: старый лежит в публичном бандле и в истории `dist/`

### Фаза 1. Переезд на FSD (только перенос, без изменения поведения)

- [x] Создать слои `app/ pages/ widgets/ features/ entities/ shared/`
- [x] shared/ui ← Button, Input, Select, Title, Logo, Pagination, icons
- [x] entities/movie ← MovieCard, MovieCardSkeleton, IMovie, слайсы movie/movies; entities/person ← IPerson, IStaff, слайсы actor/actors; entities/dictionary ← жанры/страны
- [x] features ← search-movies (SearchForm из Header), filter-movies (FormOfFilters, YearRange), toggle-theme (слайс темы)
- [x] widgets ← Header, Footer, Navbar, MoviesTopSlider, MoviesList; SelectedMovie, ActorsInfo, ActorInfo ушли в свои страницы
- [x] pages ← все страницы; Layout → app/layouts/MainLayout
- [x] app ← main.tsx, App.tsx, store (app/model), глобальные стили
- [x] Разбить `types/types.ts` по слайсам
- [x] Подключить steiger, убрать нарушения
- [x] Исправить опечатки в именах: `Srlect.module.scss` (был пустой, удалён), `filtred*`, `raitingsWrap`, `IObjectFrommainPage` → `ICollectionQuery`

### Фаза 2. Слой данных

- [x] `shared/api/baseApi` (RTK Query; baseUrl пока прямой — `API_BASE_URL` в `shared/config/api.ts`, в фазе 3 станет `/api`)
- [x] Эндпоинты через `injectEndpoints`: collections, film by id, search, discover — `entities/movie`; staff by film, person by id — `entities/person`; filters — `features/filter-movies/api`
- [x] Удалить ручные слайсы; в store остались `api` и `theme`; isActive → `useState` в Navbar
- [x] Страница, фильтры и запрос живут в URL: `/search?q=...&page=2`, `/discover?genre=...&page=...`, `/collection/:slug?page=...`
- [x] Свести 5 дублирующихся страниц в одну `CollectionPage` с конфигом подборок (`shared/config/collections`)
- [x] Понятные маршруты (`/collection/tv-shows` и т. п.), редиректы со старых адресов, константы в `shared/config/routes`
- [x] Страница 404

### Фаза 3. Деплой на Vercel

- [x] `api/kinopoisk.ts`: serverless-прокси (rewrite из `vercel.json`), ключ из `KINOPOISK_API_KEY`, allowlist эндпоинтов, CDN-кэш
- [x] Для локальной разработки — proxy в `vite.config` (dev и preview)
- [x] `vercel.json`: SPA-rewrite на `index.html` (кроме `/api`), cache headers для ассетов
- [x] Удалить workflow GitHub Pages, убрать ссылку на Netlify
- [ ] Удалить ветку `gh-pages` и выключить GitHub Pages в настройках репозитория (делает владелец)
- [ ] Подключить репозиторий к Vercel, задать `KINOPOISK_API_KEY`, первый деплой (делает владелец)
- [ ] Preview-деплои на PR — включаются автоматически с GitHub-интеграцией Vercel

### Фаза 4. UI/UX-полировка

- [x] Дизайн-токены (цвета, отступы, радиусы, типографика) как CSS-переменные в `app/styles/tokens.css`
- [x] Светлая и тёмная тема: учитывает `prefers-color-scheme`, сохраняет выбор, без вспышки при загрузке
- [x] Адаптив: проверено на 390 / 1280 / 1440 (скриншоты headless Edge)
- [x] Skeleton вместо `loading...` везде (слайдер, сетка, страница фильма, актёр, каст)
- [x] Error- и empty-состояния с retry; старые тексты убраны
- [x] Весь интерфейс на русском
- [x] Русские подписи для типов, ru-RU числа, склонения, даты
- [x] `<html lang="ru">`, meta description
- [x] Заглушка для постеров (`Poster`), `alt` с названием
- [x] Доступность: header/nav/main, `:focus-visible`, aria-label/aria-expanded/aria-current, inert у закрытой панели, Escape закрывает панель
- [x] Заголовок вкладки для каждой страницы
- [x] Прокрутка наверх при смене маршрута и `?page=`
- [ ] Debounce или подсказки в поиске (опционально)

### Фаза 4.5. Избранное

- [x] `entities/favorite`: слайс (`toggleFavorite`, `removeFavorite`, `clearFavorites`, `setFavorites`), селекторы `selectFavorites`, `selectFavoritesCount`, `selectIsFavorite(state, id)`
- [x] Сохранение в localStorage: `favoritesListener` (listener middleware) после каждого изменения; формат `{ version: 1, items }`, чтение в try/catch с валидацией
- [x] `features/toggle-favorite`: `ToggleFavoriteButton` (variant `icon` на карточке через слот `actions` у MovieCard, `full` на странице фильма), aria-pressed
- [x] `pages/favorites` (`/favorites`): сетка, сначала новые; empty-состояние со ссылкой на подборки
- [x] «Избранное» со счётчиком в навбаре и сердечко со счётчиком в шапке
- [x] Синхронизация между вкладками (`useFavoritesSync`, событие `storage`)
- [ ] Тесты: reducer, toggle-кнопка — в фазе 5, когда появится Vitest

### Фаза 5. Качество

- [ ] Vitest + Testing Library + MSW (моки API) — отложено по решению владельца (2026-11-19)
- [ ] Тесты: MovieCard, Pagination, парсинг URL-фильтров, search-feature, избранное (reducer, toggle-кнопка), один интеграционный тест страницы — отложено
- [x] GitHub Actions CI (`.github/workflows/ci.yml`): lint, steiger, format:check, typecheck + build. Шаг `npm test` добавить, когда появятся тесты
- [ ] (опционально) husky + lint-staged, conventional commits

### Фаза 6. Производительность

- [x] Ленивая загрузка страниц (`app/lib/lazyPages.ts`, Suspense в лейаутах; главная — в основном бандле)
- [x] Чанки библиотек (`manualChunks`: react, redux, swiper)
- [x] Фон: 5 МБ → WebP/JPEG 1920 и 1024px (84 / 36 КБ), фиксированный слой `body::before` вместо `background-attachment: fixed`; неиспользуемые картинки удалены
- [x] Постеры: `Poster` с `priority` (eager + fetchpriority=high) для первого экрана, остальные lazy; короткий адрес без первого редиректа (`shared/lib/image/posterUrl.ts`) с откатом на исходный; в слайдере постеры только для видимых слайдов + следующей «страницы»
- [x] Запрос слайдера стартует из `<head>` (preload, URL должен совпадать с `useGetCollectionQuery`), preconnect к хостам картинок
- [x] Оболочка шапки в `index.html` до загрузки JS; заглушка Suspense на весь экран (CLS 0)
- [x] Шиммер скелетонов на `transform` (композитная анимация)
- [x] Справочник фильтра грузится при первом открытии панели; `public/robots.txt`
- [~] Lighthouse (локально, `vite preview`, Edge): десктоп 93–94, мобильный 79–89 (разброс из-за серверов картинок Яндекса), доступность 100, SEO 100, best practices 79
  - best practices: cookies `_yasc` ставят сервера картинок Яндекса; убрать можно только проксированием картинок (например, Vercel Image Optimization `/_vercel/image` — проверить лимиты тарифа)
  - перемерить на проде Vercel (HTTP/2, CDN)

### Фаза 7. Упаковка для портфолио

- [ ] README: превью/GIF, ссылка на Vercel, фичи, стек, схема FSD, запуск локально, env
- [ ] Meta-теги и Open Graph, нормальный favicon
- [ ] Описание и topics у репозитория на GitHub
- [ ] (опционально) обновить до React 19

## Решения по продукту (2026-11-19)

- **Язык UI — русский.** Все тексты интерфейса на русском, без i18n-библиотеки; строки собраны в константы рядом со слайсами.
- **Дизайн — полируем текущий**, без редизайна: сохраняем общий вид, фон и раскладку, доводим отступы, типографику, состояния и адаптив.
- **Добавляем «Избранное»** (см. фазу 4.5).
