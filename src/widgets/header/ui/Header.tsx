import { ThemeToggle } from "@/features/toggle-theme"
import { Logo } from "@/shared/ui/logo"
import FavoritesLink from "./FavoritesLink"
import SearchForm from "./SearchForm"
import style from "./Header.module.scss"

const Header = () => (
  <header className={style.header}>
    <div className={style.container}>
      <Logo />
      <SearchForm />
      <FavoritesLink />
      <ThemeToggle />
    </div>
  </header>
)

export default Header
