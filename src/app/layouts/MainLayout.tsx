import { Outlet } from "react-router-dom"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { Navbar } from "@/widgets/navbar"
import { MoviesTopSlider } from "@/widgets/top-slider"
import style from "./Layout.module.scss"

/** Каталог: подборки, поиск, фильтр — со слайдером и выезжающей панелью */
const MainLayout = () => (
  <>
    <Header />
    <Navbar />
    <main className={style.main}>
      <MoviesTopSlider />
      <Outlet />
    </main>
    <Footer />
  </>
)
export default MainLayout
