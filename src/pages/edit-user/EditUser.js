import React from 'react';
import { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Button, Container, Row, Col, ListGroup, Form } from 'react-bootstrap';
import Header from '../../components/header/Header';
import { USER_API } from '../../services/api-url';

const EditUser = () => {
  const [role, setRole] = useState();
  const { id } = useParams();
  const history = useHistory();
  const user = { role };
  const editUser = () => {
    fetch(USER_API.base + id, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(() => {
      window.alert('User Role Modified!');
    });
    history.push('/user-section');
  };

  return (
    <div>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={2}>
            <ListGroup className="mt-4">
              <ListGroup.Item as={Link} to="/admin-dashboard" variant="info">
                Account
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/user-section" variant="info" active>
                Users
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/book-section" variant="info">
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
            <Form onSubmit={editUser} className="mt-5">
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option></option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Form.Select>
              </Form.Group>
              <Button type="submit" variant="info">
                Change Role
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditUser;
