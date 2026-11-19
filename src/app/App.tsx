import { Route, Routes } from "react-router-dom"
import "./styles/App.css"
import MainLayout from "./layouts/MainLayout"
import { Main } from "@/pages/home"
import { SelectedMoviePage } from "@/pages/movie"
import { PopularTVShows } from "@/pages/tv-shows"
import { Vampires } from "@/pages/vampires"
import { Comics } from "@/pages/comics"
import { TopPopularAll } from "@/pages/top-popular"
import { CustomFilter } from "@/pages/discover"
import { SearchResults } from "@/pages/search"
import { ActorPage } from "@/pages/actor"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/popularTVShows" element={<PopularTVShows />} />
          <Route path="/vampires" element={<Vampires />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/top-popular-for-all-time" element={<TopPopularAll />} />
          <Route path="/custom-filter" element={<CustomFilter />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Route>
        <Route path="/movie/:kinopoiskId" element={<SelectedMoviePage />} />
        <Route path="/actor/:staffId" element={<ActorPage />} />
      </Routes>
    </>
  )
}

export default App
