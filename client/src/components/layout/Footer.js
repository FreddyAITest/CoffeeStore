import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <h5>Table Booking System</h5>
            <p>Book tables at your favorite stores with ease.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p>&copy; {new Date().getFullYear()} Table Booking System. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;