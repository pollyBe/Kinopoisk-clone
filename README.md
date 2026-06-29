---

# KinoGo — Movie Discovery App

KinoGo is a movie discovery web application built for film enthusiasts who want to explore top-rated films, TV shows, and themed collections. Users can browse curated lists, search by keyword, filter by genre, country, year and type, and dive into detailed pages for both movies and actors.

---

## Tech Stack

- **React 18** — component-based UI, chosen for its ecosystem and wide adoption in the industry
- **TypeScript** — adds static typing which helped catch bugs early, especially when working with complex API responses
- **Redux Toolkit** — manages global state for movies, filters, search and user navigation; chosen over plain Redux for its reduced boilerplate
- **React Router v7** — handles client-side navigation including dynamic routes for movies and actors
- **SCSS Modules** — scoped styles per component to avoid class name collisions across the app
- **Swiper** — powers the top movies slider on the main page
- **Vite** — fast development server and build tool

**API:** [Kinopoisk Unofficial API](https://kinopoiskapiunofficial.tech)

---

## What Was Technically Interesting

**State management across multiple pages**

One of the real challenges was managing pagination state across different movie collection pages. Initially all collections shared a single Redux slice which caused a bug — navigating from page 3 of "Vampires" to "Comics" would load page 3 of comics instead of page 1. The solution was giving each collection its own dedicated slice with independent `currentPage` state.

**Typed Redux actions across components**

The `MoviesList` component is shared across all collection pages, search results and filtered results — each backed by a different slice. Getting the `setPage` prop typed correctly without coupling `MoviesList` to specific slice action types was a good TypeScript exercise. The solution was simplifying the type to `(page: number) => void` — the component only needs to call the function, not know what happens inside it.

**Pagination logic**

Building the pagination component with dynamic dots (`...`) required thinking through edge cases — what to show when current page is near the start, near the end, or in the middle. The `renderPageNumbers` function handles all three cases with a sliding window of ± 1 page around the current page.

**Actor data flow**

Actor lists are fetched inside the movie page and stored in a separate slice. A subtle bug was that navigating between movies didn't re-fetch actors because `kinopoiskId` was missing from the `useEffect` dependency array. Fixing this also required adding a `clearActors` action to prevent showing stale actor data during the loading state of the next movie.

---

## Project Structure

```
src/
├── assets/          # icons, backgrounds, favicon
├── Components/      # composite components (Header, Navbar, MoviesList...)
├── Pages/           # route-level components
├── store/           # Redux slices and store config
├── types/           # shared TypeScript interfaces
└── UI-Components/   # reusable primitive components (Button, Input, Select...)
```

The split between `Components` and `UI-Components` reflects a distinction between primitive reusable elements and composite page-level components that contain business logic.

---

## Screenshots

*Coming soon*

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/kinogo-clone

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your API key to .env

# Start development server
npm run dev
```

---

## Live Demo

[kinogo-clone.netlify.app](https://moonlit-stardust-8b35b7.netlify.app/)

---

