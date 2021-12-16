import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Header from '../../../components/header/Header';
import Profile from '../../../components/profile/Profile';
import { USER_API } from '../../../services/api-url';

const UserDashboard = () => {
  const history = useHistory();
  const [userData, setUserData] = useState([]);

  const callUserDashboard = async () => {
    try {
      const res = await fetch(USER_API.dashboard, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

      if (data.role === 'admin') {
        history.push('/admin-dashboard');
      } else if (data.role === 'user') {
        history.push('/user-dashboard');
      }
    } catch (err) {
      console.log(err);
      history.push('/login');
    }
  };

  useEffect(() => {
    callUserDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={2}>
            <ListGroup className="mt-4">
              <ListGroup.Item variant="info" active>
                Account
              </ListGroup.Item>
              <ListGroup.Item as={Link} to="/user-books" variant="info">
                My Books
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={10}>
            <Profile user={userData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;
