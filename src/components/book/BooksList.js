import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BOOK_API } from '../../services/api-url';

const BooksList = ({ books, loading }) => {
  const history = useHistory();
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  const deleteBook = (id) => {
    fetch(BOOK_API + id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/admin-dashboard');
    });
  };
  return (
    <div>
      <Table className="mt-4" striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Isbn</th>
            <th>Page Count</th>
            <th>Published Date</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{book.title}</td>
              <td>{book.isbn}</td>
              <td>{book.pageCount}</td>
              <td>{moment(book.publishedDate).format('DD-MM-YYYY')}</td>
              <td>{book.status}</td>
              <td>
                <Button
                  onClick={() => {
                    deleteBook(book._id);
                  }}
                  variant="danger"
                >
                  <i className="fas fa-trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BooksList;
