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
- `npm run build` — `tsc && vite build`
- `npm run lint` — ESLint (`eslint .`)
- `npm run lint:fsd` — steiger (проверка правил FSD)
- `npm run format` / `npm run format:check` — Prettier
- Тестов пока нет: jest удалён, Vitest добавим в фазе 5

## Env

- Сейчас: `VITE_API_KEY` — **попадает в клиентский бандл**, ключ виден всем.
- Цель: `KINOPOISK_API_KEY` хранится только на сервере (переменная окружения Vercel); клиент ходит в `/api/*` (serverless-прокси).

## Целевая структура FSD

```
src/
  app/          # main.tsx, App.tsx (роуты), layouts/, model/store.ts, styles/ (глобальные стили и фоновые картинки)
  pages/        # home, collection, movie, actor, search, discover (фильтр), favorites, not-found
  widgets/      # header, footer, navbar, top-slider, movies-grid
  features/     # search-movies, filter-movies, toggle-theme, toggle-favorite
  entities/     # movie (api, model/types, ui: MovieCard, MovieCardSkeleton), person (актёр), dictionary (жанры/страны), favorite
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
- Компонент, который используется только на одной странице, живёт в `pages/<page>/ui`, а не в widgets (правило steiger `insignificant-slice`).
- Redux-хуки: `useAppDispatch` и `useAppSelector` из `@/shared/lib/store`. Типы `RootState` и `AppDispatch` объявлены глобально в `app/model/store.ts`, потому что нижние слои не могут импортировать app.
- Steiger запрещает сегменты `store`, `providers`, `hooks`, `components`, `assets` и т. п.: сегмент называют по назначению (`model`, `ui`, `lib`).

### Соглашения

- Имена слайсов и папок — kebab-case, компонентов — PascalCase.
- Источник правды для страницы, фильтров и поискового запроса — **URL** (search params), а не Redux и не `location.state`.
- У каждого запроса данных есть три состояния: skeleton, error (с кнопкой retry) и empty.
- У картинок осмысленный `alt`, `loading="lazy"` и заглушка на случай ошибки.

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

- [ ] `shared/api/baseApi` (RTK Query, baseUrl `/api`)
- [ ] Эндпоинты через `injectEndpoints` в entities: collections, film by id, staff by film, person by id, search, filters dictionary, discover (фильтр)
- [ ] Удалить 10 ручных слайсов (movies, movie, slider, search, filtredMovies, filters, actors, actor, topMovies, isActive → в UI-стейт или локальный useState)
- [ ] Страница, фильтры и запрос живут в URL: `/search?q=...&page=2`, `/discover?genre=...&page=...`, `/collection/:type?page=...`
- [ ] Свести 5 дублирующихся страниц (Main, PopularTVShows, Vampires, Comics, TopPopularAll) в одну `CollectionPage` с конфигом подборок (`shared/config/collections`)
- [ ] Понятные маршруты (`/popularTVShows` → `/collection/tv-shows` и т. п.), константы маршрутов в `shared/config/routes`
- [ ] Страница 404

### Фаза 3. Деплой на Vercel

- [ ] `api/[...path].ts`: serverless-прокси к kinopoiskapiunofficial.tech, ключ берётся из `KINOPOISK_API_KEY`
- [ ] Для локальной разработки — proxy в `vite.config` (или `vercel dev`)
- [ ] `vercel.json`: SPA-rewrite на `index.html` (кроме `/api`), cache headers для ассетов и ответов API
- [ ] Удалить workflow GitHub Pages и ветку `gh-pages`, убрать ссылку на Netlify
- [ ] Preview-деплои на PR

### Фаза 4. UI/UX-полировка

- [ ] Дизайн-токены (цвета, отступы, радиусы, типографика) как CSS-переменные в `shared/styles`
- [ ] Рабочая светлая и тёмная тема: учитывать `prefers-color-scheme`, сохранять выбор (feature `toggle-theme`)
- [ ] Адаптив: mobile-first, проверить 360 / 768 / 1280+
- [ ] Skeleton вместо `loading...` везде (слайдер, страница фильма, актёр, каст)
- [ ] Error- и empty-состояния с retry; убрать «Ooops....», «Hoa hoa hoa hoa(Vampires)», «Will be updated soon»
- [ ] Перевести весь интерфейс на русский: навигация, заголовки подборок, кнопки, фильтры, пагинация, состояния, футер
- [ ] Русские подписи для типов из API (FILM → «Фильм», TV_SERIES → «Сериал» и т. д.), форматирование чисел и голосов (`Intl.NumberFormat('ru-RU')`), склонения («1 голос / 5 голосов»)
- [ ] `<html lang="ru">`
- [ ] Заглушка для отсутствующих постеров, `alt` с названием фильма
- [ ] Доступность: семантика (header/nav/main), видимый фокус, aria-label у иконочных кнопок, контраст
- [ ] Заголовок вкладки для каждой страницы (название фильма или актёра)
- [ ] Прокрутка наверх при смене страницы пагинации и маршрута
- [ ] Debounce или подсказки в поиске (опционально)

### Фаза 4.5. Избранное

- [ ] `entities/favorite`: модель (slice: список фильмов — id, название, постер, рейтинг, год), селекторы `selectIsFavorite(id)`, `selectFavorites`
- [ ] Сохранение в localStorage (listener middleware или подписка на store; чтение в try/catch, версия схемы)
- [ ] `features/toggle-favorite`: кнопка-сердечко (на MovieCard через слот или пропс `actions`, на странице фильма), aria-pressed
- [ ] `pages/favorites`: сетка избранного, empty-состояние «Вы пока ничего не добавили» со ссылкой на подборки
- [ ] Пункт «Избранное» в навбаре со счётчиком
- [ ] Синхронизация между вкладками (событие `storage`) — опционально
- [ ] Тесты: reducer, toggle-кнопка

### Фаза 5. Качество

- [ ] Vitest + Testing Library + MSW (моки API)
- [ ] Тесты: MovieCard, Pagination, парсинг URL-фильтров, search-feature, один интеграционный тест страницы
- [ ] GitHub Actions CI: lint, typecheck, steiger, test, build
- [ ] (опционально) husky + lint-staged, conventional commits

### Фаза 6. Производительность

- [ ] Ленивая загрузка страниц (`React.lazy` + Suspense)
- [ ] Проверить размер бандла (импорты swiper), картинки с размерами и lazy
- [ ] Lighthouse ≥ 90 по всем метрикам

### Фаза 7. Упаковка для портфолио

- [ ] README: превью/GIF, ссылка на Vercel, фичи, стек, схема FSD, запуск локально, env
- [ ] Meta-теги и Open Graph, нормальный favicon
- [ ] Описание и topics у репозитория на GitHub
- [ ] (опционально) обновить до React 19

## Решения по продукту (2026-11-19)

- **Язык UI — русский.** Все тексты интерфейса на русском, без i18n-библиотеки; строки собраны в константы рядом со слайсами.
- **Дизайн — полируем текущий**, без редизайна: сохраняем общий вид, фон и раскладку, доводим отступы, типографику, состояния и адаптив.
- **Добавляем «Избранное»** (см. фазу 4.5).
