import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Container, Row, Col, ListGroup, Table } from 'react-bootstrap';
import Header from '../../components/header/Header';
import { ADMIN_API } from '../../services/api-url';

const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);

  const getIssuedBooks = async () => {
    try {
      const res = await fetch(ADMIN_API.issuedBooks, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      setIssuedBooks(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getIssuedBooks();
  }, []);
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
              <ListGroup.Item as={Link} to="/book-section" variant="info">
                Books
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/issued-books" variant="info" active>
                Issued Books
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/admin-books" variant="info">
                My Books
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={10}>
            <Table className="mt-4" striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>BookID</th>
                  <th>UserName</th>
                  <th>userID</th>
                  <th>Issued Date</th>
                  <th>Return Date</th>
                </tr>
              </thead>
              <tbody>
                {issuedBooks.map((issuedbook, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{issuedbook.title}</td>
                    <td>{issuedbook.bookId}</td>
                    <td>{issuedbook.userName}</td>
                    <td>{issuedbook.userId}</td>
                    <td>{moment(issuedbook.issueDate).format('DD-MM-YYYY')}</td>
                    <td>{moment(issuedbook.returnDate).add(7, 'days').format('DD-MM-YYYY')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IssuedBooks;
