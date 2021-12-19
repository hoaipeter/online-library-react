import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';
import useFetch from '../../../hooks/useFetch';
import reptile from '../../../assets/reptile.jpg';
import { BOOK_API } from '../../../services/api-url';

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, error, isPending } = useFetch(BOOK_API + id);

  return (
    <div>
      <Header />
      <div className="book-details">
        {isPending && (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <div>{error}</div>}
        {book && (
          <article>
            <Container className="mt-3">
              <h1 className="text-center text-info text-capitalize">About The Book</h1>
              <Card style={{ padding: 20 }}>
                <Row>
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={book.thumbnailUrl && book.thumbnailUrl !== '' ? book.thumbnailUrl : reptile}
                    />
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col md={3}>
                        <h4>Title</h4>
                      </Col>
                      <Col md={9} className="text-secondary">
                        {book.title}
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={3}>
                        <h4>ISBN</h4>
                      </Col>
                      <Col md={9} className="text-secondary">
                        {book.isbn}
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={3}>
                        <h4>Pages</h4>
                      </Col>
                      <Col md={9} className="text-secondary">
                        {book.pageCount && book.pageCount !== 0 ? book.pageCount : 'N/A'}
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={3}>
                        <h4>Description</h4>
                      </Col>
                      <Col md={9} className="text-secondary text-justify">
                        {parse(
                          book.longDescription && book.longDescription !== 'N/A'
                            ? book.longDescription
                            : book.shortDescription
                        )}
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={3}>
                        <h4>Author</h4>
                      </Col>
                      <Col md={9} className="text-secondary">
                        {book.author ? book.author.name : 'N/A'}
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={3}>
                        <h4>Categories</h4>
                      </Col>
                      <Col md={9} className="text-secondary">
                        {book.categories.map((category, i) => {
                          return category !== '' ? <li key={i}>{category}</li> : 'N/A';
                        })}
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={3}>
                        <h4>Published</h4>
                      </Col>
                      <Col md={9} className="text-secondary">
                        {book.publishedDate}
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={3}>
                        <h4>Status</h4>
                      </Col>
                      <Col md={9} className="text-secondary">
                        {book.status}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Container>
          </article>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookDetails;
