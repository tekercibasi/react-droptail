import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Header-Komponente, die die Navigationsleiste für die App rendert
function Header() {
  return (
    <Navbar bg="primary" variant="dark">
      {/* Markenname und Link zur Startseite */}
      <Navbar.Brand as={Link} to="/">React Droptail</Navbar.Brand>
      <Nav className="mr-auto">
        {/* Link zur Kundenansicht */}
        <Nav.Link as={Link} to="/">Customer View</Nav.Link>
        {/* Link zur Barkeeper-Ansicht */}
        <Nav.Link as={Link} to="/barkeeper">Barkeeper View</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;
