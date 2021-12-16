import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import BooksList from '../../../components/book/BooksList';
import PaginationComp from '../../../components/pagination/PaginationComp';
import Header from '../../../components/header/Header';
import { BOOK_API } from '../../../services/api-url';

const BookSection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(20);

  const fetchBooks = async () => {
    setLoading(true);
    const res = await fetch(BOOK_API, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    });
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * Get current Books
   */
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  /*
   * Change Page
   */
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col md={2}>
            <ListGroup className="mt-4">
              <ListGroup.Item as={Link} to="/admin-dashboard" variant="info">
                Account
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/user-section" variant="info">
                Users
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/book-section" variant="info" active>
                Books
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/issued-books" variant="info">
                Issued Books
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/admin-books" variant="info">
                My Books
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={10}>
            <Row>
              <Col md={4} className="mt-1">
                <Button as={Link} to="/add-books" variant="success">
                  <i className="fas fa-plus-circle" /> Add
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {books && <BooksList books={currentBooks} loading={loading} />}
                <PaginationComp booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookSection;
