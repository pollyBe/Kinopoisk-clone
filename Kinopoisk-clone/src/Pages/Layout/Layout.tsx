import { Outlet } from "react-router-dom"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import Navbar from "../../Components/Navbar/Navbar"

const Layout = () => {
  return <>
    <Header />
    <Navbar/>
    <Outlet />
    <Footer />
  </>
}
export default Layout