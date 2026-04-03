import style from './Pagination.module.scss';

import Next from '../../assets/icons/Icon-Arrow-Next.svg?react';
import Prev from '../../assets/icons/Icon-Arrow-Prev.svg?react';

interface IProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, setPage }: IProps) => {

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    const createPage = (page: number) => (
      <button
        key={page}
        className={
          page === currentPage
            ? style.pageNumbersCurr
            : style.pageNumbers
        }
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    );

    const createDots = (key: string) => (
      <span key={key} className={style.dots}>
        ...
      </span>
    );

    pages.push(createPage(1));

    if (currentPage > 3) {
      pages.push(createDots("left"));
    }

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(createPage(i));
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push(createDots("right"));
    }

    if (totalPages > 1) {
      pages.push(createPage(totalPages));
    }
    return pages;
  };

  return (
    <div className={style.numbersWrapper}>
      <button className={style.NumberButton} onClick={handlePrevious} disabled={currentPage === 1}>
        <Prev className={style.icon} /> Prev
      </button>
      <div className={style.pageNumbersWrap}>{renderPageNumbers()}</div>
      <button className={style.NumberButton} onClick={handleNext} disabled={currentPage === totalPages}>
        Next <Next className={style.icon} />
      </button>
    </div>
  );
};

export default Pagination;
