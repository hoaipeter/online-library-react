import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComp = ({ booksPerPage, totalBooks, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <Pagination className="flex-wrap justify-content-center mt-2">
        {pageNumbers.map((number) => (
          <Pagination.Item onClick={() => paginate(number)} key={number}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PaginationComp;
