import style from "./Layout.module.scss"

/** Пока грузится чанк страницы: занимает место, чтобы подвал не прыгал */
const PageFallback = () => <div className={style.fallback} aria-busy="true" aria-label="Загрузка" />

export default PageFallback
