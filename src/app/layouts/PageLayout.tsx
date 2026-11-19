import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import PageFallback from "./PageFallback"
import style from "./Layout.module.scss"

/** Страницы фильма и актёра: только шапка и подвал */
const PageLayout = () => (
  <>
    <Header />
    <main className={style.main}>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </>
)
export default PageLayout
