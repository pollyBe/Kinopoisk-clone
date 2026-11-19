import style from "./Footer.module.scss"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <p>© {currentYear} Kinopoisk-clone · Автор: Polina Belash</p>
        <p>
          Данные:{" "}
          <a href="https://kinopoiskapiunofficial.tech" target="_blank" rel="noopener noreferrer">
            Kinopoisk API Unofficial
          </a>
        </p>
      </div>
    </footer>
  )
}
export default Footer
