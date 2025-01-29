import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Pages/Layout/Layout'
import Main from './Pages/Main/Main'
import SelectedMoviePage from './Pages/SelectedMoviePage/SelectedMoviePage'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route path='/' element={<Main />} />
        </Route>
        <Route path='/movie/:id' element={<SelectedMoviePage />} />
      </Routes>
    </>
  )
}

export default App
