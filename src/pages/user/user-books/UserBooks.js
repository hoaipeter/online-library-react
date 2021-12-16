import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table, Container, Row, Col, ListGroup } from 'react-bootstrap';
import moment from 'moment';
import Header from '../../../components/header/Header';
import { ADMIN_API, USER_API } from '../../../services/api-url';

const UserBooks = () => {
  const [books, setBooks] = useState([]);
  const history = useHistory();

  const getIssuedBooks = async () => {
    try {
      const res = await fetch(ADMIN_API.adminBooks, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      setBooks(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteIssueBook = (id) => {
    fetch(`${USER_API.userBooks}/` + id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/user-dashboard');
    });
  };

  useEffect(() => {
    getIssuedBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={2}>
            <ListGroup className="mt-4">
              <ListGroup.Item as={Link} to="/user-dashboard" variant="info">
                Account
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/user-books" variant="info" active>
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
                  <th>Return</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.bookId}</td>
                    <td>{book.userName}</td>
                    <td>{book.userId}</td>
                    <td>{moment(book.issueDate).format('DD-MM-YYYY')}</td>
                    <td>{moment(book.returnDate).add(7, 'days').format('DD-MM-YYYY')}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteIssueBook(book._id);
                        }}
                      >
                        <i className="fas fa-undo-alt" />
                      </Button>
                    </td>
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

export default UserBooks;
