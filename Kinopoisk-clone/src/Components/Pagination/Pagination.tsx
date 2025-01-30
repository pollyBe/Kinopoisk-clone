import style from './Pagination.module.scss';

import Next from '../../assets/icons/Icon-Arrow-Next.svg?react';
import Prev from '../../assets/icons/Icon-Arrow-Prev.svg?react';

interface IProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  setPage: (page: number) => void;
}

const Pagination = ({ currentPage, itemsPerPage, totalItems, setPage }: IProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
    const pageNumbers = [];
    const maxPageNumbers = 4;
    const startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 1);
    const endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          className={i === currentPage ? style.pageNumbersCurr : style.pageNumbers}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
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
