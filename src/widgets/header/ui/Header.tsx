import { ThemeToggle } from "@/features/toggle-theme"
import { Logo } from "@/shared/ui/logo"
import SearchForm from "./SearchForm"
import style from "./Header.module.scss"

const Header = () => (
  <header className={style.header}>
    <div className={style.container}>
      <Logo />
      <SearchForm />
      <ThemeToggle />
    </div>
  </header>
)

export default Header
