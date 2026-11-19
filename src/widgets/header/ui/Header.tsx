import { SearchForm } from "@/features/search-movies"
import { Logo } from "@/shared/ui/logo"
import style from "./Header.module.scss"

const Header = () => {
  const { header, container } = style

  return (
    <section className={header}>
      <div className={container}>
        <div className={style.headerWrap}>
          <Logo />
          <SearchForm />
        </div>
      </div>
    </section>
  )
}

export default Header
