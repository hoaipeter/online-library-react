import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Profile = ({ user }) => {
  return (
    <div>
      <Container>
        <div className="main">
          <Row>
            <Col md={12} className="mt-1">
              <Card className="mb-3 content">
                <h1 className="m-3 pt-3">About</h1>
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <h5>Username:</h5>
                    </Col>
                    <Col md={9} className="text-secondary text-capitalize">
                      {user.name}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md={3}>
                      <h5>User Id:</h5>
                    </Col>
                    <Col md={9} className="text-secondary">
                      {user._id}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md={3}>
                      <h5>Email Id:</h5>
                    </Col>
                    <Col md={9} className="text-secondary">
                      {user.email}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md={3}>
                      <h5>Mobile Number:</h5>
                    </Col>
                    <Col md={9} className="text-secondary">
                      {user.phone}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md={3}>
                      <h5>Role:</h5>
                    </Col>
                    <Col md={9} className="text-secondary text-capitalize">
                      {user.role}
                    </Col>
                  </Row>
                  <hr />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
