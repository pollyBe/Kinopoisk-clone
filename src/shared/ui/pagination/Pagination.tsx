import style from "./Pagination.module.scss"

import { ArrowNextIcon as Next, ArrowPrevIcon as Prev } from "../icons"

interface IProps {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, setPage }: IProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) setPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1)
  }

  const renderPageNumbers = () => {
    const pages = []

    const createPage = (page: number) => {
      const isCurrent = page === currentPage
      return (
        <button
          key={page}
          type="button"
          className={isCurrent ? style.pageNumbersCurr : style.pageNumbers}
          onClick={() => setPage(page)}
          aria-label={`Страница ${page}`}
          aria-current={isCurrent ? "page" : undefined}
        >
          {page}
        </button>
      )
    }

    const createDots = (key: string) => (
      <span key={key} className={style.dots} aria-hidden="true">
        …
      </span>
    )

    pages.push(createPage(1))

    if (currentPage > 3) pages.push(createDots("left"))

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) pages.push(createPage(i))
    }

    if (currentPage < totalPages - 2) pages.push(createDots("right"))

    if (totalPages > 1) pages.push(createPage(totalPages))

    return pages
  }

  return (
    <nav className={style.numbersWrapper} aria-label="Страницы">
      <button
        type="button"
        className={style.NumberButton}
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        aria-label="Предыдущая страница"
      >
        <Prev className={style.icon} aria-hidden="true" />
        <span className={style.label}>Назад</span>
      </button>
      <div className={style.pageNumbersWrap}>{renderPageNumbers()}</div>
      <button
        type="button"
        className={style.NumberButton}
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        aria-label="Следующая страница"
      >
        <span className={style.label}>Вперёд</span>
        <Next className={style.icon} aria-hidden="true" />
      </button>
    </nav>
  )
}

export default Pagination
