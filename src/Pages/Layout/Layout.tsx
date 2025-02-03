import { Outlet } from "react-router-dom"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import Navbar from "../../Components/Navbar/Navbar"
import MoviesTopSlider from "../../Components/MoviesTopSlider/MoviesTopSlider"

const Layout = () => {
  return <>
    <Header />
    <MoviesTopSlider />
    <Navbar/>
    <Outlet />
    <Footer />
  </>
}
export default Layout