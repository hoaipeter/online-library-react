import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Container, Row, Col, ListGroup } from 'react-bootstrap';
import Header from '../../../components/header/Header';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [authors, setAuthors] = useState([]);
  const [pageCount, setPageCount] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('');

  const history = useHistory();

  const postBook = (e) => {
    e.preventDefault();
    const book = {
      title,
      isbn,
      shortDescription,
      authors,
      pageCount,
      categories,
      status
    };

    fetch('http://localhost:5000/books', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(book)
    }).then(() => {
      window.alert('New Book Added!');
      history.push('/book-section');
    });
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
              <ListGroup.Item variant="info">Users</ListGroup.Item>
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
            <Container className="mt-3">
              <Form onSubmit={postBook}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>ISBN</Form.Label>
                      <Form.Control
                        type="number"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        name="isbn"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Page Count</Form.Label>
                  <Form.Control
                    type="number"
                    value={pageCount}
                    onChange={(e) => setPageCount(e.target.value)}
                    name="isbn"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    name="shortDescription"
                    required
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Author</Form.Label>
                      <Form.Control
                        type="text"
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                        name="authors"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Categories</Form.Label>
                      <Form.Control
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        name="categories"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option></option>
                    <option value="PUBLISH">PUBLISH</option>
                    <option value="UNPUBLISH">UNPUBLISH</option>
                  </Form.Select>
                </Form.Group>

                <Button type="submit">Add Book</Button>
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddBook;
