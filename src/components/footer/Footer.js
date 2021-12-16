import React from 'react';

const Footer = () => {
  return (
    <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
      <footer className="mt-3">
        <div className="footer-content">
          <ul className="socials">
            <li>
              <a href="https://www.facebook.com/dukeho83/" target="_blank" rel="noreferrer noopener">
                <i className="fab fa-facebook" />
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
        <div className="footer-bottom">
          <p>
            copyright &copy;2021 Library designed by <span>Duke Ho</span>{' '}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
