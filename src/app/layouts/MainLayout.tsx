import { Outlet } from "react-router-dom"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { Navbar } from "@/widgets/navbar"
import { MoviesTopSlider } from "@/widgets/top-slider"

const MainLayout = () => {
  return (
    <>
      <Header />
      <MoviesTopSlider />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
export default MainLayout
