import Button from "../../UI-Components/Button/Button"
import Input from "../../UI-Components/Input/Input"
import Logo from "../../UI-Components/Logo/Logo"

import style from './Header.module.scss'
const Header = () => {
  const { header, container, inputWrap } = style;
  return (
  <section className={header}>
      <div className={container}>
        <div className={style.headerWrap}>
          <Logo />
          <div className={inputWrap}>
            <Input
              name='search'
              placeholder="Search"
              type="search"
            />
            <Button text='Search' type='button' onClick={()=>console.log('click') } />
          </div>
        </div>
    </div>
  </section>)
}
export default Header