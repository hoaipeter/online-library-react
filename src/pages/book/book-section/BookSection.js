import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import BooksList from '../../../components/book/BooksList';
import PaginationComp from '../../../components/pagination/PaginationComp';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import { BOOK_API } from '../../../services/api-url';

const BookSection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(9);
  const [numBooks, setNumBooks] = useState(0);

  const fetchBooks = async (currentPage) => {
    setLoading(true);
    try {
      const res = await fetch(`${BOOK_API}?page=${currentPage}&size=${booksPerPage}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        }
      });
      const data = await res.json();
      setBooks(data.books);
      setNumBooks(data.count);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks(currentPage);
  }, []);

  /*
   * Change Page
   */
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber !== currentPage) {
      fetchBooks(pageNumber);
      setCurrentPage(pageNumber);
    }
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
              <Col>
                {books && <BooksList books={books} loading={loading} />}
                <PaginationComp
                  loading={loading}
                  currentPage={currentPage}
                  totalCount={numBooks}
                  pageSize={booksPerPage}
                  onPageChange={(page) => paginate(page)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default BookSection;
