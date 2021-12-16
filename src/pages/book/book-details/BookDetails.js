import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Header from '../../../components/header/Header';
import useFetch from '../../../hooks/useFetch';

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, error, isPending } = useFetch('http://localhost:5000/books/' + id);

  return (
    <div>
      <Header />
      <div className="book-details">
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {book && (
          <article>
            <Container className="mt-3">
              <h1 className="text-center text-info text-capitalize">About The Book</h1>
              <Card>
                <Row>
                  <Col md={3}>
                    <Card.Img variant="top" src={book.thumbnailUrl} />
                  </Col>
                  <Col md={9}>
                    <Row>
                      <Col md={3}>
                        <h4>Book Title</h4>
                      </Col>
                      <Col md={9} className="text-secondary">
                        {book.title}
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={3}>
                        <h4>Description</h4>
                      </Col>
                      <Col md={9} className="text-secondary text-justify">
                        {book.longDescription || book.shortDescription}
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={3}>
                        <h4>Authors</h4>
                      </Col>
                      <Col md={9} className="text-secondary">
                        <ul>
                          {book.authors.map((author, i) => (
                            <li key={i}>{author}</li>
                          ))}
                        </ul>
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col md={3}>
                        <h4>Categories</h4>
                      </Col>
                      <Col md={9} className="text-secondary">
                        <ul>
                          {book.categories.map((category, i) => (
                            <li key={i}>{category}</li>
                          ))}
                        </ul>
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
                    <hr />
                  </Col>
                </Row>
              </Card>
            </Container>
          </article>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
