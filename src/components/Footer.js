import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Footer-Komponente, die das Footer-Element für die App rendert
const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center py-3">
      <Container>
        <Row>
          <Col>
            <p>&copy; 2024 React Droptail</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
