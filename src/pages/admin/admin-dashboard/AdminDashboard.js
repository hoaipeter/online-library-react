import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Header from '../../../components/header/Header';
import Profile from '../../../components/profile/Profile';

const AdminDashboard = () => {
  const history = useHistory();
  const [adminData, setAdminData] = useState([]);
  const callAdminDashboard = async () => {
    try {
      const res = await fetch('http://localhost:5000/admin/dashboard', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      setAdminData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else {
        if (data.role === 'admin') {
          history.push('/admin-dashboard');
        } else if (data.role === 'user') {
          history.push('/user-dashboard');
        }
      }
    } catch (err) {
      console.log(err);
      history.push('/login');
    }
  };
  useEffect(() => {
    callAdminDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={2}>
            <ListGroup className="mt-4">
              <ListGroup.Item as={Link} to="/admin-dashboard" variant="info" active>
                Account
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/user-section" variant="info">
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
            <Profile user={adminData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
