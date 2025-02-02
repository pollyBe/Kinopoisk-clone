import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Pages/Layout/Layout'
import Main from './Pages/Main/Main'
import SelectedMoviePage from './Pages/SelectedMoviePage/SelectedMoviePage'
import PopularTVShows from './Pages/Main/PopularTVShows'
import Vampires from './Pages/Main/Vampires'
import Comics from './Pages/Main/Comics'
import Family from './Pages/Main/TopPopularAll'
import TopPopularAll from './Pages/Main/TopPopularAll'
import CustomFilter from './Pages/Main/CustomFilter'
import SearchResults from './Pages/Main/SearchResults'

function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<Layout />}>
          <Route path='/' element={<Main />} />
          <Route path='/popularTVShows' element={<PopularTVShows />} />
          <Route path='/vampires' element={<Vampires />} />
          <Route path='/comics' element={<Comics />} />
          <Route path='/family' element={<Family />} />
          <Route path='/top-popular-for-all-time' element={<TopPopularAll />} />
          <Route path='/custom-filter' element={<CustomFilter />} />
          <Route path='/search-results' element={<SearchResults/>}/>
      </Route>
        <Route path='/movie/:kinopoiskId' element={<SelectedMoviePage />} />
      </Routes>
    </>
  )
}

export default App
