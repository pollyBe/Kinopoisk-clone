import style from './Footer.module.scss'
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <p>©{currentYear} Kinogo-clone</p>
        <p>By Polina Belash</p>
      </div>
    </footer>
  )
}
export default Footer