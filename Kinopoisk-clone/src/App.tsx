import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Pages/Layout/Layout'
import Main from './Pages/Main/Main'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route path='/' element={<Main />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
