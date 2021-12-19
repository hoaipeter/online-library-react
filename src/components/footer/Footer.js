import React from 'react';
import { Container, Navbar, NavbarBrand } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="mt-5">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <NavbarBrand>
            <div className="footer-bottom">
              <p>
                copyright &copy;{new Date().getFullYear()} Library designed by <span>Duke Ho</span>{' '}
              </p>
            </div>
          </NavbarBrand>
          <div className="footer-content">
            <ul className="socials">
              <li>
                <a href="https://github.com/hoaipeter" target="_blank" rel="noreferrer noopener">
                  <i className="fab fa-github" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/duke_hoai/" target="_blank" rel="noreferrer noopener">
                  <i className="fab fa-instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/duke-ho-b2755a166/" target="_blank" rel="noreferrer noopener">
                  <i className="fab fa-linkedin" />
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Footer;
