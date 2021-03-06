import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const NotFound = () => {
  return (
    <div>
      <Header />
      <Container className="mt-5 mb-5">
        <h2>Sorry</h2>
        <p>That page cannot be found</p>
        <Link to="/">Back to the homepage...</Link>
      </Container>
      <Footer />
    </div>
  );
};

export default NotFound;
