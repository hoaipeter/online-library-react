import React from 'react';
import { Pagination } from 'react-bootstrap';
import { usePagination, DOTS } from '../../hooks/usePagination';

const PaginationComp = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, loading } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (loading) {
    return null;
  }

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div>
      <Pagination className="flex-wrap justify-content-center mt-2">
        <Pagination.Prev onClick={onPrevious} disabled={currentPage === 1} />
        {paginationRange.map((pageNumber) => {
          return pageNumber === DOTS ? (
            <Pagination.Ellipsis key={`dot-${Math.floor(Math.random() * 100) + 1}`} />
          ) : (
            <Pagination.Item
              onClick={() => onPageChange(pageNumber)}
              key={`page-${pageNumber}`}
              active={pageNumber === currentPage}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}
        <Pagination.Next onClick={onNext} disabled={currentPage === lastPage} />
      </Pagination>
    </div>
  );
};

export default PaginationComp;
