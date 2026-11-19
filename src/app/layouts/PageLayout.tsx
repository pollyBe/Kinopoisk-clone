import { Outlet } from "react-router-dom"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import style from "./Layout.module.scss"

/** Страницы фильма и актёра: только шапка и подвал */
const PageLayout = () => (
  <>
    <Header />
    <main className={style.main}>
      <Outlet />
    </main>
    <Footer />
  </>
)
export default PageLayout
